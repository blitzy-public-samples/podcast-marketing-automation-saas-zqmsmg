from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserProfileView

app_name = 'authentication'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]

# TODO: Add URL pattern for email verification
# TODO: Add URL pattern for password reset functionality
# TODO: Consider adding URL patterns for social media authentication if implemented