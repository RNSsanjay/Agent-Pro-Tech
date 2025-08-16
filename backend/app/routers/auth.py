from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models import (
    UserCreate, UserResponse, Token, LoginRequest, 
    ForgotPasswordRequest, ResetPasswordRequest, 
    VerifyEmailRequest, MessageResponse, GoogleAuthRequest
)
from app.auth import (
    verify_password, get_password_hash, create_access_token, 
    create_refresh_token, generate_verification_token, 
    generate_reset_token, hash_token, verify_token_hash
)
from app.database import get_database
from app.email_service import email_service
from app.dependencies import get_current_user, check_admin_email
from app.config import settings
from datetime import datetime, timedelta
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/signup", response_model=MessageResponse)
async def signup(user: UserCreate, db = Depends(get_database)):
    """User registration"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Check if this is admin email
        is_admin = check_admin_email(user.email)
        
        # Hash password
        hashed_password = get_password_hash(user.password)
        
        # Create user document
        user_doc = {
            "email": user.email,
            "full_name": user.full_name,
            "hashed_password": hashed_password,
            "is_active": True,
            "is_verified": False,
            "is_admin": is_admin,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Insert user
        result = await db.users.insert_one(user_doc)
        
        # Generate verification token
        verification_token = generate_verification_token()
        verification_doc = {
            "email": user.email,
            "token": hash_token(verification_token),
            "expires_at": datetime.utcnow() + timedelta(hours=24),
            "created_at": datetime.utcnow()
        }
        
        # Store verification token
        await db.email_verifications.insert_one(verification_doc)
        
        # Send verification email
        email_sent = await email_service.send_verification_email(user.email, verification_token)
        
        if not email_sent:
            logger.warning(f"Failed to send verification email to {user.email}")
        
        return MessageResponse(
            message="Account created successfully! Please check your email to verify your account.",
            success=True
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration"
        )

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, db = Depends(get_database)):
    """User login"""
    try:
        # Find user
        user = await db.users.find_one({"email": login_data.email})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Verify password
        if not verify_password(login_data.password, user["hashed_password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Check if user is active
        if not user["is_active"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account is deactivated"
            )
        
        # For admin, skip email verification requirement
        if not user["is_admin"] and not user["is_verified"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please verify your email before logging in"
            )
        
        # Create tokens
        access_token = create_access_token(data={"sub": user["email"]})
        refresh_token = create_refresh_token(data={"sub": user["email"]})
        
        # Send login notification email (async, don't wait)
        try:
            await email_service.send_login_notification(user["email"], user["full_name"])
        except Exception as e:
            logger.warning(f"Failed to send login notification to {user['email']}: {e}")
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login"
        )

@router.post("/verify-email", response_model=MessageResponse)
async def verify_email(request: VerifyEmailRequest, db = Depends(get_database)):
    """Verify email address"""
    try:
        # Find verification record
        verification = await db.email_verifications.find_one({
            "token": hash_token(request.token),
            "expires_at": {"$gt": datetime.utcnow()}
        })
        
        if not verification:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired verification token"
            )
        
        # Update user as verified
        result = await db.users.update_one(
            {"email": verification["email"]},
            {
                "$set": {
                    "is_verified": True,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Delete verification token
        await db.email_verifications.delete_one({"_id": verification["_id"]})
        
        return MessageResponse(
            message="Email verified successfully! You can now log in.",
            success=True
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during email verification"
        )

@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(request: ForgotPasswordRequest, db = Depends(get_database)):
    """Request password reset"""
    try:
        # Check if user exists
        user = await db.users.find_one({"email": request.email})
        if not user:
            # Return success even if user doesn't exist (security)
            return MessageResponse(
                message="If an account with this email exists, a password reset link has been sent.",
                success=True
            )
        
        # Generate reset token
        reset_token = generate_reset_token()
        reset_doc = {
            "email": request.email,
            "token": hash_token(reset_token),
            "expires_at": datetime.utcnow() + timedelta(hours=1),
            "created_at": datetime.utcnow()
        }
        
        # Store reset token (replace any existing ones)
        await db.password_resets.delete_many({"email": request.email})
        await db.password_resets.insert_one(reset_doc)
        
        # Send reset email
        email_sent = await email_service.send_password_reset_email(request.email, reset_token)
        
        if not email_sent:
            logger.warning(f"Failed to send password reset email to {request.email}")
        
        return MessageResponse(
            message="If an account with this email exists, a password reset link has been sent.",
            success=True
        )
        
    except Exception as e:
        logger.error(f"Forgot password error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your request"
        )

@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(request: ResetPasswordRequest, db = Depends(get_database)):
    """Reset password with token"""
    try:
        # Find reset record
        reset_record = await db.password_resets.find_one({
            "token": hash_token(request.token),
            "expires_at": {"$gt": datetime.utcnow()}
        })
        
        if not reset_record:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token"
            )
        
        # Hash new password
        hashed_password = get_password_hash(request.new_password)
        
        # Update user password
        result = await db.users.update_one(
            {"email": reset_record["email"]},
            {
                "$set": {
                    "hashed_password": hashed_password,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Delete reset token
        await db.password_resets.delete_one({"_id": reset_record["_id"]})
        
        return MessageResponse(
            message="Password reset successfully! You can now log in with your new password.",
            success=True
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Password reset error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during password reset"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        _id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
        is_admin=current_user.is_admin,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at
    )
