import jwt
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed

class JWTAuthMiddleware:
    """
    Middleware class for JWT authentication in the Podcast Marketing Automation SaaS platform backend.
    This middleware intercepts incoming requests, validates JWT tokens, and sets the authenticated user on the request object.
    """

    def __init__(self, get_response):
        """
        Initialize the JWTAuthMiddleware.

        Args:
            get_response (callable): The next middleware or view in the chain.
        """
        self.get_response = get_response

    def __call__(self, request):
        """
        Process the request and perform JWT authentication.

        Args:
            request (HttpRequest): The incoming request object.

        Returns:
            HttpResponse: The response from the next middleware or view.

        Raises:
            AuthenticationFailed: If the token is invalid or the user is not found.
        """
        token = self.get_token_from_header(request)

        if token:
            try:
                payload = self.validate_token(token)
                user = self.get_user_from_payload(payload)
                request.user = user
            except AuthenticationFailed as e:
                # Log the authentication failure
                print(f"Authentication failed: {str(e)}")
                # You may want to use a proper logging mechanism in production

        response = self.get_response(request)
        return response

    def get_token_from_header(self, request):
        """
        Extract the JWT token from the Authorization header.

        Args:
            request (HttpRequest): The incoming request object.

        Returns:
            str: The JWT token if present, None otherwise.
        """
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(' ')[1]
        return None

    def validate_token(self, token):
        """
        Validate the JWT token and return the decoded payload.

        Args:
            token (str): The JWT token to validate.

        Returns:
            dict: The decoded JWT payload.

        Raises:
            AuthenticationFailed: If the token is invalid or expired.
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')

    def get_user_from_payload(self, payload):
        """
        Retrieve the user object based on the JWT payload.

        Args:
            payload (dict): The decoded JWT payload.

        Returns:
            User: The User object if found.

        Raises:
            AuthenticationFailed: If the user is not found.
        """
        user_id = payload.get('user_id')
        if not user_id:
            raise AuthenticationFailed('User ID not found in token')

        try:
            user = User.objects.get(id=user_id)
            return user
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')

# TODO: Implement proper error handling and logging for authentication failures
# TODO: Review and adjust JWT token expiration time for security
# TODO: Implement token refresh mechanism (Optional)
# TODO: Add rate limiting to prevent brute force attacks