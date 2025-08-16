# Demo Authentication System for Testing
# This provides working authentication without requiring database connection
from typing import Dict, Optional
from datetime import datetime
from app.models import UserCreate, UserInDB, UserResponse, Token
from app.auth import get_password_hash, verify_password, create_access_token, create_refresh_token
import logging

logger = logging.getLogger(__name__)

# In-memory user storage for demo
demo_users: Dict[str, dict] = {
    # Default admin user
    "StructMind@ai.com": {
        "_id": "admin_user_id",
        "email": "StructMind@ai.com",
        "full_name": "StructMind Admin",
        "hashed_password": get_password_hash("123ugofree"),
        "is_active": True,
        "is_verified": True,
        "is_admin": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "google_id": None
    },
    # Demo regular user
    "test@example.com": {
        "_id": "demo_user_id",
        "email": "test@example.com",
        "full_name": "Demo User",
        "hashed_password": get_password_hash("password123"),
        "is_active": True,
        "is_verified": True,
        "is_admin": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "google_id": None
    }
}

class DemoAuthService:
    """Demo authentication service that works without database"""
    
    @staticmethod
    def create_user(user_data: UserCreate) -> dict:
        """Create a new demo user"""
        if user_data.email in demo_users:
            raise ValueError("User already exists")
        
        user_id = f"user_{len(demo_users) + 1}"
        demo_users[user_data.email] = {
            "_id": user_id,
            "email": user_data.email,
            "full_name": user_data.full_name,
            "hashed_password": get_password_hash(user_data.password),
            "is_active": True,
            "is_verified": True,  # Auto-verify for demo
            "is_admin": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "google_id": None
        }
        return demo_users[user_data.email]
    
    @staticmethod
    def get_user_by_email(email: str) -> Optional[dict]:
        """Get user by email"""
        return demo_users.get(email)
    
    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[dict]:
        """Authenticate user with email and password"""
        user = demo_users.get(email)
        if not user:
            return None
        
        if not verify_password(password, user["hashed_password"]):
            return None
            
        return user
    
    @staticmethod
    def create_tokens(user: dict) -> Token:
        """Create access and refresh tokens"""
        access_token = create_access_token({"sub": user["email"]})
        refresh_token = create_refresh_token({"sub": user["email"]})
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )
    
    @staticmethod
    def get_all_users() -> list:
        """Get all users (for admin)"""
        return list(demo_users.values())

# Initialize the demo service
demo_auth = DemoAuthService()
