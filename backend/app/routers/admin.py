from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_database
from app.dependencies import get_current_admin_user, require_database
from typing import List, Dict, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/dashboard")
async def get_admin_dashboard(
    current_admin = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Get admin dashboard data"""
    try:
        # Get user statistics
        total_users = await db.users.count_documents({})
        verified_users = await db.users.count_documents({"is_verified": True})
        active_users = await db.users.count_documents({"is_active": True})
        
        # Get chat statistics
        total_sessions = await db.chat_sessions.count_documents({})
        
        # Get recent users (last 10)
        recent_users = await db.users.find(
            {},
            {"email": 1, "full_name": 1, "created_at": 1, "is_verified": 1, "is_active": 1}
        ).sort("created_at", -1).limit(10).to_list(length=10)
        
        # Format recent users
        formatted_users = []
        for user in recent_users:
            formatted_users.append({
                "id": str(user["_id"]),
                "email": user["email"],
                "full_name": user["full_name"],
                "created_at": user["created_at"],
                "is_verified": user["is_verified"],
                "is_active": user["is_active"]
            })
        
        return {
            "stats": {
                "total_users": total_users,
                "verified_users": verified_users,
                "active_users": active_users,
                "total_chat_sessions": total_sessions
            },
            "recent_users": formatted_users
        }
        
    except Exception as e:
        logger.error(f"Admin dashboard error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching dashboard data"
        )

@router.get("/users")
async def get_all_users(
    current_admin = Depends(get_current_admin_user),
    db = Depends(get_database),
    skip: int = 0,
    limit: int = 50
):
    """Get all users with pagination"""
    try:
        users = await db.users.find(
            {},
            {"hashed_password": 0}  # Exclude password
        ).skip(skip).limit(limit).sort("created_at", -1).to_list(length=limit)
        
        total_count = await db.users.count_documents({})
        
        # Format users
        formatted_users = []
        for user in users:
            formatted_users.append({
                "id": str(user["_id"]),
                "email": user["email"],
                "full_name": user["full_name"],
                "is_active": user["is_active"],
                "is_verified": user["is_verified"],
                "is_admin": user.get("is_admin", False),
                "created_at": user["created_at"],
                "updated_at": user["updated_at"]
            })
        
        return {
            "users": formatted_users,
            "total": total_count,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Get users error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching users"
        )

@router.put("/users/{user_id}/toggle-active")
async def toggle_user_active(
    user_id: str,
    current_admin = Depends(get_current_admin_user),
    db = Depends(get_database)
):
    """Toggle user active status"""
    try:
        from bson import ObjectId
        
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Don't allow deactivating admin users
        if user.get("is_admin", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot deactivate admin users"
            )
        
        new_status = not user["is_active"]
        
        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}}
        )
        
        action = "activated" if new_status else "deactivated"
        return {"message": f"User {action} successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Toggle user active error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while updating user status"
        )
