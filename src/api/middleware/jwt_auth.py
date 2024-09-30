import jwt
from django.conf import settings
from django.contrib.auth.middleware import AuthenticationMiddleware
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthenticationError(Exception):
    """Custom exception for authentication errors."""
    pass

class JWTAuthMiddleware(AuthenticationMiddleware):
    """Middleware for JWT authentication"""

    def __init__(self, get_response):
        """Initialize the JWTAuthMiddleware"""
        super().__init__(get_response)
        self.get_response = get_response

    def __call__(self, request):
        """Process the request and perform JWT authentication"""
        token = self.get_token_from_header(request)
        if not token:
            # If no token is present, continue to the next middleware
            return self.get_response(request)

        try:
            # Decode and verify the JWT token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = self.authenticate_credentials(payload)
            request.user = user
        except jwt.ExpiredSignatureError:
            raise AuthenticationError('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationError('Invalid token')
        except User.DoesNotExist:
            raise AuthenticationError('User not found')

        return self.get_response(request)

    def get_token_from_header(self, request):
        """Extract the JWT token from the Authorization header"""
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if auth_header.startswith('Bearer '):
            return auth_header.split(' ')[1]
        return None

    def authenticate_credentials(self, payload):
        """Authenticate the user based on the JWT token"""
        user_id = payload.get('user_id')
        if not user_id:
            raise AuthenticationError('Invalid payload')

        user = User.objects.get(id=user_id)
        if not user.is_active:
            raise AuthenticationError('User is inactive')

        return user

# TODO: Implement token refresh mechanism to handle token expiration
# TODO: Add rate limiting to prevent brute-force attacks on the authentication endpoint
# TODO: Implement logging for authentication attempts and failures