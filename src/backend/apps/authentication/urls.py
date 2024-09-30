from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UserProfileView

app_name = 'authentication'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]

# TODO: Add URL pattern for password reset functionality once implemented
# TODO: Add URL pattern for email verification process once implemented
# TODO: Consider adding versioning to API endpoints (e.g., /api/v1/auth/...)