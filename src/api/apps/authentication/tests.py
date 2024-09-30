from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserProfileSerializer

class AuthenticationTestCase(TestCase):
    def setUp(self):
        """Set up the test environment"""
        self.client = APIClient()
        self.test_user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'username': 'testuser'
        }

    def test_user_registration(self):
        """Test user registration process"""
        url = reverse('register')
        response = self.client.post(url, self.test_user_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email=self.test_user_data['email']).exists())
        self.assertEqual(response.data['email'], self.test_user_data['email'])
        self.assertEqual(response.data['username'], self.test_user_data['username'])
        self.assertNotIn('password', response.data)

    def test_user_login(self):
        """Test user login process"""
        # Create a test user
        User.objects.create_user(**self.test_user_data)
        
        url = reverse('login')
        login_data = {
            'email': self.test_user_data['email'],
            'password': self.test_user_data['password']
        }
        response = self.client.post(url, login_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_user_profile_update(self):
        """Test user profile update functionality"""
        # Create and authenticate a test user
        user = User.objects.create_user(**self.test_user_data)
        self.client.force_authenticate(user=user)
        
        url = reverse('profile')
        update_data = {
            'username': 'updateduser',
            'bio': 'Test bio'
        }
        response = self.client.patch(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user.refresh_from_db()
        self.assertEqual(user.username, update_data['username'])
        self.assertEqual(user.bio, update_data['bio'])

    def test_invalid_registration(self):
        """Test registration with invalid data"""
        url = reverse('register')
        invalid_data = {
            'email': 'invalid-email',
            'password': 'short',
            'username': ''
        }
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)
        self.assertIn('username', response.data)

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        url = reverse('login')
        invalid_data = {
            'email': 'nonexistent@example.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_user_logout(self):
        """Test user logout functionality"""
        # Create and authenticate a test user
        user = User.objects.create_user(**self.test_user_data)
        self.client.force_authenticate(user=user)
        
        url = reverse('logout')
        response = self.client.post(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Attempt to access a protected view after logout
        protected_url = reverse('profile')
        response = self.client.get(protected_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# Human tasks (commented):
# TODO: Implement additional test cases for custom authentication logic if any
# TODO (Optional): Add test cases for password reset functionality if implemented
# TODO (Optional): Consider adding integration tests with other components of the system