# StructMind Backend

A FastAPI-based backend for the StructMind AI chat application.

## Features

- **User Authentication**: Secure signup, login, email verification, and password reset
- **Admin Panel**: Admin dashboard with user management
- **AI Chat**: Integration with Google Gemini 1.5 Flash for intelligent conversations
- **Email Services**: Automated email notifications and verification
- **MongoDB Integration**: Scalable database with proper indexing
- **JWT Security**: Secure token-based authentication

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and configure:
   ```
   EMAIL_HOST_USER=your_email@gmail.com
   EMAIL_HOST_PASSWORD=your_app_password
   JWT_SECRET_KEY=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   MONGODB_URL=mongodb://localhost:27017
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on your system.

4. **Run the Application**:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login  
- `POST /auth/verify-email` - Email verification
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `GET /auth/me` - Get current user info

### Chat
- `POST /chat/` - Send chat message
- `GET /chat/sessions` - Get user's chat sessions
- `GET /chat/sessions/{session_id}` - Get specific chat session
- `DELETE /chat/sessions/{session_id}` - Delete chat session

### Admin
- `GET /admin/dashboard` - Admin dashboard data
- `GET /admin/users` - Get all users (paginated)
- `PUT /admin/users/{user_id}/toggle-active` - Toggle user status

## Admin Access

- Email: `StructMind@ai.com`
- Password: `123ugofree`

## Development

The application uses:
- FastAPI for the web framework
- MongoDB with Motor for async database operations
- JWT for authentication
- Google Gemini for AI chat functionality
- SMTP for email services
