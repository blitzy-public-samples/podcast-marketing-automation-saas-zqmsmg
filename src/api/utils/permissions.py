from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission class to allow only owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        """
        Checks if the user has permission to perform the requested action on the object.

        Args:
            request (HttpRequest): The incoming request.
            view (APIView): The view handling the request.
            obj (Any): The object being accessed.

        Returns:
            bool: True if the user has permission, False otherwise.
        """
        # Allow read-only access for safe methods (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check if the object has an 'owner' attribute
        if hasattr(obj, 'owner'):
            # Allow write access only if the request user is the owner
            return obj.owner == request.user

        return False


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission class to allow full access to admin users and read-only access to others.
    """

    def has_permission(self, request, view):
        """
        Checks if the user has permission to perform the requested action.

        Args:
            request (HttpRequest): The incoming request.
            view (APIView): The view handling the request.

        Returns:
            bool: True if the user has permission, False otherwise.
        """
        # Allow read-only access for safe methods (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow write access only for authenticated admin users
        return request.user.is_authenticated and request.user.is_staff


def has_podcast_permission(user, podcast, action):
    """
    Utility function to check if a user has permission to access or modify a podcast.

    Args:
        user (User): The user attempting to access the podcast.
        podcast (Podcast): The podcast being accessed.
        action (str): The action being performed (e.g., 'view', 'edit', 'delete').

    Returns:
        bool: True if the user has permission, False otherwise.
    """
    # Check if the user is the owner of the podcast
    if podcast.owner == user:
        return True

    # Allow viewing if the podcast is public
    if action == 'view' and podcast.is_public:
        return True

    # Check if the user is a collaborator with appropriate permissions
    if hasattr(podcast, 'collaborators') and user in podcast.collaborators.all():
        if action == 'view':
            return True
        elif action == 'edit' and podcast.collaborator_edit_allowed:
            return True

    return False


# Human tasks (commented as requested):
# TODO: Implement additional permission classes for specific use cases (e.g., IsCollaboratorOrReadOnly)
# TODO: Add unit tests for permission classes and utility functions
# TODO: Review and update permissions based on the final user role system