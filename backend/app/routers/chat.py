from fastapi import APIRouter, Depends, HTTPException, status
from app.models import ChatRequest, ChatResponse, ChatSession, ChatMessage
from app.database import get_database
from app.dependencies import get_current_verified_user
from app.gemini_service import gemini_service
from bson import ObjectId
from datetime import datetime
from typing import List
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user = Depends(get_current_verified_user),
    db = Depends(get_database)
):
    """Send a message to the chatbot"""
    try:
        session_id = request.session_id
        
        # If no session_id provided, create a new session
        if not session_id:
            # Generate title for new session
            title = await gemini_service.generate_chat_title(request.message)
            
            session_doc = {
                "user_id": current_user.id,
                "title": title,
                "messages": [],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = await db.chat_sessions.insert_one(session_doc)
            session_id = str(result.inserted_id)
        else:
            # Verify session belongs to current user
            session = await db.chat_sessions.find_one({
                "_id": ObjectId(session_id),
                "user_id": current_user.id
            })
            
            if not session:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Chat session not found"
                )
        
        # Get chat history for context
        session = await db.chat_sessions.find_one({"_id": ObjectId(session_id)})
        chat_history = session.get("messages", []) if session else []
        
        # Add user message to session
        user_message = {
            "role": "user",
            "content": request.message,
            "timestamp": datetime.utcnow()
        }
        
        await db.chat_sessions.update_one(
            {"_id": ObjectId(session_id)},
            {
                "$push": {"messages": user_message},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        # Get response from Gemini
        response_text = await gemini_service.chat(request.message, chat_history)
        
        # Add assistant message to session
        assistant_message = {
            "role": "assistant",
            "content": response_text,
            "timestamp": datetime.utcnow()
        }
        
        await db.chat_sessions.update_one(
            {"_id": ObjectId(session_id)},
            {
                "$push": {"messages": assistant_message},
                "$set": {"updated_at": datetime.utcnow()}
            }
        )
        
        return ChatResponse(
            response=response_text,
            session_id=session_id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message"
        )

@router.get("/sessions", response_model=List[dict])
async def get_chat_sessions(
    current_user = Depends(get_current_verified_user),
    db = Depends(get_database)
):
    """Get user's chat sessions"""
    try:
        sessions = await db.chat_sessions.find(
            {"user_id": current_user.id}
        ).sort("updated_at", -1).to_list(length=100)
        
        # Convert ObjectId to string and format response
        result = []
        for session in sessions:
            result.append({
                "id": str(session["_id"]),
                "title": session["title"],
                "created_at": session["created_at"],
                "updated_at": session["updated_at"],
                "message_count": len(session.get("messages", []))
            })
        
        return result
        
    except Exception as e:
        logger.error(f"Get sessions error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching chat sessions"
        )

@router.get("/sessions/{session_id}", response_model=dict)
async def get_chat_session(
    session_id: str,
    current_user = Depends(get_current_verified_user),
    db = Depends(get_database)
):
    """Get a specific chat session with messages"""
    try:
        session = await db.chat_sessions.find_one({
            "_id": ObjectId(session_id),
            "user_id": current_user.id
        })
        
        if not session:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat session not found"
            )
        
        return {
            "id": str(session["_id"]),
            "title": session["title"],
            "messages": session.get("messages", []),
            "created_at": session["created_at"],
            "updated_at": session["updated_at"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get session error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching the chat session"
        )

@router.delete("/sessions/{session_id}")
async def delete_chat_session(
    session_id: str,
    current_user = Depends(get_current_verified_user),
    db = Depends(get_database)
):
    """Delete a chat session"""
    try:
        result = await db.chat_sessions.delete_one({
            "_id": ObjectId(session_id),
            "user_id": current_user.id
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat session not found"
            )
        
        return {"message": "Chat session deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete session error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while deleting the chat session"
        )
