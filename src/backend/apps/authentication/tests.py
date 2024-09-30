from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import User

class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_user_data = {
            'email': 'test@example.com',
            'password': 'testpassword123',
            'username': 'testuser'
        }
        self.user = User.objects.create_user(**self.test_user_data)

    def test_user_registration(self):
        url = reverse('user-registration')
        data = {
            'email': 'newuser@example.com',
            'password': 'newpassword123',
            'username': 'newuser'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertTrue(User.objects.filter(email='newuser@example.com').exists())

    def test_user_login(self):
        url = reverse('user-login')
        data = {
            'email': self.test_user_data['email'],
            'password': self.test_user_data['password']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_user_logout(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('user-logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verify that the token is no longer valid
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data.get('token', ''))
        profile_url = reverse('user-profile')
        profile_response = self.client.get(profile_url)
        self.assertEqual(profile_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_profile(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('user-profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.test_user_data['email'])
        self.assertEqual(response.data['username'], self.test_user_data['username'])

    def test_update_user_profile(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('user-profile')
        updated_data = {
            'username': 'updateduser',
            'email': 'updated@example.com'
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'updateduser')
        self.assertEqual(self.user.email, 'updated@example.com')

    def test_invalid_registration(self):
        url = reverse('user-registration')
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
        url = reverse('user-login')
        invalid_data = {
            'email': self.test_user_data['email'],
            'password': 'wrongpassword'
        }
        response = self.client.post(url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

# TODO: Implement tests for password reset functionality once it's added
# TODO: Add tests for email verification process when implemented
# TODO: Create tests for rate limiting on authentication endpoints
# TODO: Implement tests for multi-factor authentication if added in the future