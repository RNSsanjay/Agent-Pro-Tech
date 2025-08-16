import google.generativeai as genai
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        
    async def chat(self, message: str, chat_history: list = None) -> str:
        """Send a message to Gemini and get response"""
        try:
            # Prepare the conversation history
            if chat_history:
                # Convert chat history to the format expected by Gemini
                history = []
                for msg in chat_history[-10:]:  # Keep last 10 messages for context
                    role = "user" if msg["role"] == "user" else "model"
                    history.append({
                        "role": role,
                        "parts": [msg["content"]]
                    })
                
                # Start a chat with history
                chat = self.model.start_chat(history=history)
                response = chat.send_message(message)
            else:
                # Single message without history
                response = self.model.generate_content(message)
            
            return response.text
            
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            return "I apologize, but I'm having trouble processing your request right now. Please try again later."

    async def generate_chat_title(self, first_message: str) -> str:
        """Generate a title for the chat session based on the first message"""
        try:
            prompt = f"Generate a short, descriptive title (max 6 words) for a conversation that starts with: '{first_message[:100]}...'"
            response = self.model.generate_content(prompt)
            title = response.text.strip().strip('"').strip("'")
            return title[:50]  # Limit to 50 characters
        except Exception as e:
            logger.error(f"Error generating chat title: {e}")
            return "New Chat"

# Create Gemini service instance
gemini_service = GeminiService()
