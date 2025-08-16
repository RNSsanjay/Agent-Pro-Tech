import requests
import json
import time
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_signup_login_cycle(test_number: int):
    """Test signup and login for a user"""
    print(f"\n🧪 Test {test_number}: Starting signup/login cycle")
    
    # Generate unique user data
    email = f"test{test_number}@example.com"
    password = f"password{test_number}"
    full_name = f"Test User {test_number}"
    
    try:
        # 1. Test Signup
        print(f"   📝 Signup: {email}")
        signup_data = {
            "email": email,
            "password": password,
            "full_name": full_name,
            "is_active": True,
            "is_verified": False
        }
        
        signup_response = requests.post(
            f"{BASE_URL}/auth/signup",
            json=signup_data,
            headers={"Content-Type": "application/json"}
        )
        
        if signup_response.status_code == 200:
            print(f"   ✅ Signup successful: {signup_response.json()['message']}")
        else:
            print(f"   ❌ Signup failed: {signup_response.status_code} - {signup_response.text}")
            return False
        
        # 2. Test Login
        print(f"   🔐 Login: {email}")
        login_data = {
            "email": email,
            "password": password
        }
        
        login_response = requests.post(
            f"{BASE_URL}/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"}
        )
        
        if login_response.status_code == 200:
            token_data = login_response.json()
            access_token = token_data["access_token"]
            print(f"   ✅ Login successful: Token received")
            
            # 3. Test Protected Route (/me)
            print(f"   👤 Testing /me endpoint")
            me_response = requests.get(
                f"{BASE_URL}/auth/me",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            
            if me_response.status_code == 200:
                user_data = me_response.json()
                print(f"   ✅ /me successful: {user_data['full_name']} ({user_data['email']})")
                return True
            else:
                print(f"   ❌ /me failed: {me_response.status_code} - {me_response.text}")
                return False
        else:
            print(f"   ❌ Login failed: {login_response.status_code} - {login_response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error in test {test_number}: {str(e)}")
        return False

def test_admin_user():
    """Test the default admin user"""
    print(f"\n👑 Testing Admin User Login")
    
    try:
        login_data = {
            "email": "StructMind@ai.com",
            "password": "123ugofree"
        }
        
        login_response = requests.post(
            f"{BASE_URL}/auth/login",
            json=login_data,
            headers={"Content-Type": "application/json"}
        )
        
        if login_response.status_code == 200:
            token_data = login_response.json()
            access_token = token_data["access_token"]
            print(f"   ✅ Admin login successful")
            
            # Test admin /me endpoint
            me_response = requests.get(
                f"{BASE_URL}/auth/me",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            
            if me_response.status_code == 200:
                user_data = me_response.json()
                print(f"   ✅ Admin user info: {user_data['full_name']} (Admin: {user_data['is_admin']})")
                return True
            else:
                print(f"   ❌ Admin /me failed: {me_response.status_code}")
                return False
        else:
            print(f"   ❌ Admin login failed: {login_response.status_code} - {login_response.text}")
            return False
            
    except Exception as e:
        print(f"   ❌ Error in admin test: {str(e)}")
        return False

def main():
    """Run comprehensive authentication tests"""
    print("🚀 StructMind Authentication System Test Suite")
    print("=" * 60)
    
    # Test auth status first
    try:
        status_response = requests.get(f"{BASE_URL}/auth/status")
        if status_response.status_code == 200:
            status_data = status_response.json()
            print(f"📊 Auth Status: {status_data['message']}")
            print(f"💾 Database Available: {status_data['database_available']}")
            print(f"👥 Demo Users: {status_data['demo_users_count']}")
        else:
            print(f"❌ Auth status check failed: {status_response.status_code}")
            return
    except Exception as e:
        print(f"❌ Cannot connect to server: {str(e)}")
        print("Make sure the backend server is running on http://localhost:8000")
        return
    
    # Test admin user first
    admin_success = test_admin_user()
    
    # Run 10 signup/login tests
    success_count = 0
    total_tests = 10
    
    for i in range(1, total_tests + 1):
        if test_signup_login_cycle(i):
            success_count += 1
        time.sleep(0.5)  # Small delay between tests
    
    # Final results
    print("\n" + "=" * 60)
    print(f"📈 TEST RESULTS:")
    print(f"   👑 Admin Login: {'✅ PASS' if admin_success else '❌ FAIL'}")
    print(f"   👤 User Tests: {success_count}/{total_tests} PASSED")
    print(f"   📊 Success Rate: {(success_count/total_tests)*100:.1f}%")
    
    if success_count == total_tests and admin_success:
        print(f"   🎉 ALL TESTS PASSED! Authentication system is working perfectly!")
    else:
        print(f"   ⚠️  Some tests failed. Check the logs above for details.")
    
    print("\n🔗 API Documentation: http://localhost:8000/docs")
    print("🌐 Frontend URL: http://localhost:5173")

if __name__ == "__main__":
    main()
