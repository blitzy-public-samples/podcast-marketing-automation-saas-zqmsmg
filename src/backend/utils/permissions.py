from rest_framework.permissions import BasePermission

def is_owner_or_admin(obj, user):
    """
    Checks if the user is the owner of the object or an admin.

    Args:
        obj: The object to check ownership for.
        user: The user to check permissions for.

    Returns:
        bool: True if user is owner or admin, False otherwise.
    """
    if not user.is_authenticated:
        return False
    
    if user.is_staff:  # Assuming is_staff represents admin status
        return True
    
    if hasattr(obj, 'owner'):
        return obj.owner == user
    
    return False

class IsOwnerOrAdmin(BasePermission):
    """
    Custom permission class to allow access only to owners or admins.
    """

    def has_object_permission(self, request, view, obj):
        """
        Checks if the user has permission to access the object.

        Args:
            request: The request object.
            view: The view handling the request.
            obj: The object being accessed.

        Returns:
            bool: True if user has permission, False otherwise.
        """
        return is_owner_or_admin(obj, request.user)

class IsAdminUser(BasePermission):
    """
    Custom permission class to allow access only to admin users.
    """

    def has_permission(self, request, view):
        """
        Checks if the user is an admin.

        Args:
            request: The request object.
            view: The view handling the request.

        Returns:
            bool: True if user is admin, False otherwise.
        """
        return request.user.is_authenticated and request.user.is_staff

# Human tasks:
# TODO: Implement unit tests for permission classes and utility functions
# TODO: Review and update permission classes based on specific business rules
# TODO: Document usage examples for each permission class