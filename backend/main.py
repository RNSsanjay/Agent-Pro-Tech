from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.database import connect_to_mongo, close_mongo_connection
from app.routers import chat, admin
from app.clean_auth_router import router as clean_auth_router
from app.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up StructMind API...")
    await connect_to_mongo()
    yield
    # Shutdown
    logger.info("Shutting down StructMind API...")
    await close_mongo_connection()

app = FastAPI(
    title="StructMind API",
    description="A powerful AI-powered chat application with user management and admin features",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(clean_auth_router)
app.include_router(chat.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to StructMind API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
