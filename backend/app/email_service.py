import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.host = settings.EMAIL_HOST
        self.port = settings.EMAIL_PORT
        self.username = settings.EMAIL_HOST_USER
        self.password = settings.EMAIL_HOST_PASSWORD
        self.use_tls = settings.EMAIL_USE_TLS
        self.use_ssl = settings.EMAIL_USE_SSL

    async def send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send email"""
        try:
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.username
            message["To"] = to_email

            # Add text content if provided
            if text_content:
                text_part = MIMEText(text_content, "plain")
                message.attach(text_part)

            # Add HTML content
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)

            # Send email
            if self.use_ssl:
                await aiosmtplib.send(
                    message,
                    hostname=self.host,
                    port=self.port,
                    username=self.username,
                    password=self.password,
                    use_tls=False,
                    start_tls=False
                )
            else:
                await aiosmtplib.send(
                    message,
                    hostname=self.host,
                    port=self.port,
                    username=self.username,
                    password=self.password,
                    use_tls=self.use_tls
                )

            logger.info(f"Email sent successfully to {to_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {e}")
            return False

    async def send_verification_email(self, to_email: str, verification_token: str):
        """Send email verification"""
        verification_url = f"{settings.FRONTEND_URL}/verify-email?token={verification_token}"
        
        subject = "Verify Your StructMind Account"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧠 StructMind</h1>
                <h2>Welcome to StructMind!</h2>
            </div>
            <div class="content">
                <p>Hello!</p>
                <p>Thank you for signing up for StructMind. To complete your registration, please verify your email address by clicking the button below:</p>
                <div style="text-align: center;">
                    <a href="{{ verification_url }}" class="btn">Verify Email Address</a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">{{ verification_url }}</p>
                <p>This verification link will expire in 24 hours for security reasons.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>The StructMind Team</p>
                <p><small>This is an automated email, please do not reply.</small></p>
            </div>
        </body>
        </html>
        """
        
        template = Template(html_template)
        html_content = template.render(verification_url=verification_url)
        
        text_content = f"""
        Welcome to StructMind!
        
        Please verify your email address by visiting: {verification_url}
        
        This link will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
        
        Best regards,
        The StructMind Team
        """
        
        return await self.send_email(to_email, subject, html_content, text_content)

    async def send_password_reset_email(self, to_email: str, reset_token: str):
        """Send password reset email"""
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
        
        subject = "Reset Your StructMind Password"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧠 StructMind</h1>
                <h2>Password Reset Request</h2>
            </div>
            <div class="content">
                <p>Hello!</p>
                <p>We received a request to reset your password for your StructMind account.</p>
                <div style="text-align: center;">
                    <a href="{{ reset_url }}" class="btn">Reset Your Password</a>
                </div>
                <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 5px;">{{ reset_url }}</p>
                <div class="warning">
                    <strong>⚠️ Security Notice:</strong>
                    <ul>
                        <li>This reset link will expire in 1 hour</li>
                        <li>If you didn't request this reset, please ignore this email</li>
                        <li>Your password will remain unchanged unless you use this link</li>
                    </ul>
                </div>
            </div>
            <div class="footer">
                <p>Best regards,<br>The StructMind Team</p>
                <p><small>This is an automated email, please do not reply.</small></p>
            </div>
        </body>
        </html>
        """
        
        template = Template(html_template)
        html_content = template.render(reset_url=reset_url)
        
        text_content = f"""
        Password Reset Request
        
        We received a request to reset your password for your StructMind account.
        
        Reset your password by visiting: {reset_url}
        
        This link will expire in 1 hour.
        
        If you didn't request this reset, please ignore this email.
        
        Best regards,
        The StructMind Team
        """
        
        return await self.send_email(to_email, subject, html_content, text_content)

    async def send_login_notification(self, to_email: str, user_name: str):
        """Send login notification email"""
        subject = "New Login to Your StructMind Account"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Notification</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: #e8f4fd; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧠 StructMind</h1>
                <h2>Login Notification</h2>
            </div>
            <div class="content">
                <p>Hello {{ user_name }}!</p>
                <p>We wanted to let you know that there was a successful login to your StructMind account.</p>
                <div class="info-box">
                    <strong>📅 Login Details:</strong>
                    <ul>
                        <li>Time: {{ login_time }}</li>
                        <li>Account: {{ email }}</li>
                    </ul>
                </div>
                <p>If this was you, no action is needed. If you didn't log in, please secure your account immediately by changing your password.</p>
                <p>If you have any security concerns, please contact our support team.</p>
            </div>
            <div class="footer">
                <p>Best regards,<br>The StructMind Team</p>
                <p><small>This is an automated security notification.</small></p>
            </div>
        </body>
        </html>
        """
        
        from datetime import datetime
        login_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        
        template = Template(html_template)
        html_content = template.render(
            user_name=user_name,
            email=to_email,
            login_time=login_time
        )
        
        text_content = f"""
        Login Notification
        
        Hello {user_name}!
        
        There was a successful login to your StructMind account.
        
        Login Details:
        - Time: {login_time}
        - Account: {to_email}
        
        If this wasn't you, please secure your account immediately.
        
        Best regards,
        The StructMind Team
        """
        
        return await self.send_email(to_email, subject, html_content, text_content)

# Create email service instance
email_service = EmailService()
