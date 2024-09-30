from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser with additional fields
    for the Podcast Marketing Automation platform.
    """
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('creator', 'Creator/Host'),
        ('collaborator', 'Collaborator'),
        ('viewer', 'Viewer'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='creator')
    last_login = models.DateTimeField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the User.
        """
        return self.email or self.username

    def get_full_name(self):
        """
        Returns the user's full name.
        """
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        """
        Returns the user's short name.
        """
        return self.first_name

    def save(self, *args, **kwargs):
        """
        Override the save method to update the last_login field if it's a new user.
        """
        if not self.pk:
            self.last_login = timezone.now()
        super().save(*args, **kwargs)

# Human tasks (to be addressed by developers):
# TODO: Determine if additional user-related fields are required for the Podcast Marketing Automation platform
# TODO: Decide on the specific roles to be used in the 'role' field
# TODO: Implement any custom authentication logic if needed