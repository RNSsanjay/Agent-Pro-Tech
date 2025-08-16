from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    database = None

db = Database()

async def connect_to_mongo():
    """Create database connection"""
    try:
        db.client = AsyncIOMotorClient(settings.MONGODB_URL)
        db.database = db.client[settings.DATABASE_NAME]
        
        # Test the connection
        await db.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
        
        # Create indexes
        await create_indexes()
        
    except ConnectionFailure as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        logger.warning("Application will start without database connection. Some features may not work.")
        # Don't raise the exception, allow the app to start
        db.client = None
        db.database = None
    except Exception as e:
        logger.error(f"Unexpected error connecting to MongoDB: {e}")
        logger.warning("Application will start without database connection. Some features may not work.")
        db.client = None
        db.database = None

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        logger.info("Disconnected from MongoDB")

def is_database_available():
    """Check if database connection is available"""
    return db.client is not None and db.database is not None

async def create_indexes():
    """Create database indexes"""
    if not is_database_available():
        logger.warning("Database not available, skipping index creation")
        return
        
    try:
        # Users collection indexes
        await db.database.users.create_index("email", unique=True)
        await db.database.users.create_index("google_id", unique=True, sparse=True)
        
        # Chat history indexes
        await db.database.chat_history.create_index([("user_id", 1), ("created_at", -1)])
        
        # Email verification indexes
        await db.database.email_verifications.create_index("token", unique=True)
        await db.database.email_verifications.create_index("expires_at")
        
        # Password reset indexes
        await db.database.password_resets.create_index("token", unique=True)
        await db.database.password_resets.create_index("expires_at")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error creating indexes: {e}")

def get_database():
    return db.database
