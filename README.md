# StructMind - AI-Powered Chat Application

StructMind is a full-stack AI chat application built with modern web technologies. It features a React frontend with TypeScript and Tailwind CSS, powered by a FastAPI backend with MongoDB database and Google Gemini 1.5 Flash integration for intelligent conversations.

## 🚀 Features

### Frontend Features
- **Modern React UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Beautiful, accessible design that works on all devices
- **Authentication Flow**: Complete signup, login, email verification, and password reset
- **Real-time Chat Interface**: Grok-like chat interface with session management
- **Admin Dashboard**: Comprehensive admin panel with user management
- **Protected Routes**: Role-based access control for users and admins
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Toast Notifications**: User-friendly feedback with react-hot-toast
- **Smooth Animations**: Framer Motion powered animations and transitions

### Backend Features
- **FastAPI Framework**: High-performance async Python web framework
- **MongoDB Integration**: Scalable NoSQL database with Motor async driver
- **JWT Authentication**: Secure token-based authentication
- **Email Services**: Automated email verification and password reset
- **Google Gemini AI**: Integration with Gemini 1.5 Flash for intelligent responses
- **Admin System**: Special admin access with enhanced permissions
- **Session Management**: Multi-session chat history and management
- **Input Validation**: Comprehensive request validation with Pydantic
- **Error Handling**: Robust error handling and logging

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **FastAPI** Python web framework
- **MongoDB** with Motor async driver
- **JWT** for authentication
- **Pydantic** for data validation
- **Google Generative AI** (Gemini 1.5 Flash)
- **SMTP** for email services
- **Bcrypt** for password hashing
- **CORS** middleware for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Gmail account** with App Password for email services

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Agent-Pro-Tech
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start MongoDB (if running locally)
# Make sure MongoDB is running on mongodb://localhost:27017

# Run the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
```env
EMAIL_HOST_USER=coesnsihub@gmail.com
EMAIL_HOST_PASSWORD=drwe hiwf guea vsmc
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
JWT_SECRET_KEY=django-insecure-vo%+ff1o2f&vs^%g*-$w5e&ag%u(k7^t)b68w0yc8&va7l4rbh
PASSWORD_SALT=secure-salt-for-password-hashing-2024
FRONTEND_URL=http://localhost:5173
SECRET_KEY=django-insecure-vo%+ff1o2f&vs^%g*-$w5e&ag%u(k7^t)b68w0yc8&va7l4rbh
DEBUG=True
GOOGLE_OAUTH_CLIENT_ID=66462752826-fqke7i519nvbedp5h9kq0rhpga60v0p5.apps.googleusercontent.com
GEMINI_API_KEY=AIzaSyDRe1rnzv0JA39Llsht3n4P97hvBjoLPnQ
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=structmind
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 👤 Admin Access

The application includes a built-in admin account:

- **Email**: `StructMind@ai.com`
- **Password**: `123ugofree`

The admin has access to:
- Admin dashboard with user statistics
- User management (activate/deactivate users)
- System overview and monitoring
- All regular user features

## 🎯 Usage

### User Flow
1. **Landing Page**: Visit the homepage to learn about StructMind
2. **Sign Up**: Create a new account with email verification
3. **Email Verification**: Check email and verify account
4. **Login**: Sign in to access the chat interface
5. **Chat**: Start conversations with the AI assistant
6. **Session Management**: Create, view, and delete chat sessions

### Admin Flow
1. **Admin Login**: Use admin credentials to access admin features
2. **Dashboard**: View user statistics and system overview
3. **User Management**: Monitor and manage user accounts
4. **Chat Access**: Access regular chat features alongside admin tools

### Email Features
- **Signup Verification**: Automated email verification for new accounts
- **Password Reset**: Secure password reset via email links
- **Login Notifications**: Email notifications for account logins
- **Beautiful Templates**: HTML email templates with modern design

## 🔌 API Endpoints

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

## 🎨 UI/UX Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Accessible**: WCAG compliant design with proper color contrast and keyboard navigation
- **Modern Chat Interface**: Grok-inspired chat bubbles with typing indicators
- **Loading States**: Beautiful loading spinners and skeleton states
- **Error Handling**: User-friendly error messages and fallbacks

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt for secure password storage
- **Email Verification**: Required email verification for new accounts
- **Rate Limiting**: Protection against spam and abuse (can be added)
- **CORS Protection**: Properly configured CORS for cross-origin requests
- **Input Validation**: Comprehensive input validation and sanitization
- **Secure Headers**: Security headers and middleware

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with bottom navigation
- **PWA Ready**: Can be extended to Progressive Web App

## 🧪 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
uvicorn main:app --reload    # Start with auto-reload
python -m pytest           # Run tests (when added)
```

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- **Vercel**: `npm run build` and deploy the `dist` folder
- **Netlify**: Connect repository and auto-deploy
- **GitHub Pages**: Use GitHub Actions for deployment

### Backend Deployment
The backend can be deployed to:
- **Railway**: Direct deployment with environment variables
- **Heroku**: Use Procfile for deployment
- **DigitalOcean**: Deploy using App Platform
- **AWS**: Use EC2 or Lambda with API Gateway

### Database
- **MongoDB Atlas**: Recommended for production
- **Local MongoDB**: For development and testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini**: For providing the AI capabilities
- **Tailwind CSS**: For the utility-first CSS framework
- **FastAPI**: For the excellent Python web framework
- **React**: For the powerful frontend library
- **MongoDB**: For the flexible database solution

## 📞 Support

If you need help or have questions:
1. Check the documentation above
2. Create an issue in the repository
3. Contact the development team

---

**StructMind** - Your intelligent AI companion powered by cutting-edge technology! 🧠✨
This is the project where we can create the  architecture of a project with marmide code.
