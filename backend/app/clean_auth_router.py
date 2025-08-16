from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.models import (
    UserCreate, UserResponse, Token, LoginRequest, 
    MessageResponse
)
from app.auth import verify_token, get_password_hash, verify_password
from app.demo_auth import demo_auth
from app.database import get_database, is_database_available
from app.dependencies import require_database
from datetime import datetime
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/signup", response_model=MessageResponse)
async def signup(user: UserCreate):
    """User registration - Clean and simple"""
    try:
        logger.info(f"Signup attempt for email: {user.email}")
        
        # Check if database is available
        if is_database_available():
            # Use database version
            db = get_database()
            existing_user = await db.users.find_one({"email": user.email})
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User with this email already exists"
                )
            
            # Create user in database
            user_doc = {
                "email": user.email,
                "full_name": user.full_name,
                "hashed_password": get_password_hash(user.password),
                "is_active": True,
                "is_verified": True,  # Auto-verify for demo
                "is_admin": user.email == "StructMind@ai.com",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "google_id": None
            }
            
            result = await db.users.insert_one(user_doc)
            logger.info(f"User created in database with ID: {result.inserted_id}")
            
        else:
            # Use demo version
            logger.info("Database not available, using demo authentication")
            try:
                demo_auth.create_user(user)
                logger.info(f"Demo user created: {user.email}")
            except ValueError as e:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=str(e)
                )
        
        return MessageResponse(
            message=f"Account created successfully for {user.email}! You can now log in.",
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
async def login(login_data: LoginRequest):
    """User login - Clean and simple"""
    try:
        logger.info(f"Login attempt for email: {login_data.email}")
        
        user = None
        
        # Check if database is available
        if is_database_available():
            # Use database version
            db = get_database()
            user = await db.users.find_one({"email": login_data.email})
            logger.info(f"Database user lookup: {'Found' if user else 'Not found'}")
            
            if user and not verify_password(login_data.password, user["hashed_password"]):
                user = None
                
        else:
            # Use demo version
            logger.info("Database not available, using demo authentication")
            user = demo_auth.authenticate_user(login_data.email, login_data.password)
            logger.info(f"Demo user authentication: {'Success' if user else 'Failed'}")
        
        if not user:
            logger.warning(f"Login failed for email: {login_data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        # Check if user is active
        if not user.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account is inactive"
            )
        
        # Create tokens
        if is_database_available():
            from app.auth import create_access_token, create_refresh_token
            access_token = create_access_token({"sub": user["email"]})
            refresh_token = create_refresh_token({"sub": user["email"]})
            token = Token(
                access_token=access_token,
                refresh_token=refresh_token,
                token_type="bearer"
            )
        else:
            token = demo_auth.create_tokens(user)
        
        logger.info(f"Login successful for email: {login_data.email}")
        return token
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(token: str = Depends(verify_token)):
    """Get current user information"""
    try:
        if not token or not token.email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        user = None
        
        # Check if database is available
        if is_database_available():
            db = get_database()
            user = await db.users.find_one({"email": token.email})
        else:
            user = demo_auth.get_user_by_email(token.email)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return UserResponse(
            id=str(user["_id"]),
            email=user["email"],
            full_name=user["full_name"],
            is_active=user["is_active"],
            is_verified=user["is_verified"],
            is_admin=user.get("is_admin", False),
            created_at=user["created_at"],
            updated_at=user["updated_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get user info error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching user information"
        )

@router.get("/status")
async def auth_status():
    """Check authentication system status"""
    return {
        "message": "Authentication system is working",
        "database_available": is_database_available(),
        "demo_users_count": len(demo_auth.get_all_users()),
        "timestamp": datetime.utcnow().isoformat()
    }
