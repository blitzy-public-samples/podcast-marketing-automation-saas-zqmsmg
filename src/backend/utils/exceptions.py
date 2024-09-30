from rest_framework.exceptions import APIException as DRFAPIException

class APIException(DRFAPIException):
    """
    Base exception class for API-related errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail, code):
        """
        Initialize the APIException.

        Args:
            detail (str): A human-readable explanation of the error.
            code (str): A unique identifier for this particular error occurrence.
        """
        super().__init__(detail, code)
        self.detail = detail
        self.code = code


class ValidationError(APIException):
    """
    Exception for validation errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail):
        """
        Initialize the ValidationError.

        Args:
            detail (str): A human-readable explanation of the validation error.
        """
        super().__init__(detail=detail, code='validation_error')


class AuthenticationError(APIException):
    """
    Exception for authentication errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail):
        """
        Initialize the AuthenticationError.

        Args:
            detail (str): A human-readable explanation of the authentication error.
        """
        super().__init__(detail=detail, code='authentication_error')


class PermissionDenied(APIException):
    """
    Exception for permission denied errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail):
        """
        Initialize the PermissionDenied error.

        Args:
            detail (str): A human-readable explanation of the permission denied error.
        """
        super().__init__(detail=detail, code='permission_denied')


class NotFound(APIException):
    """
    Exception for resource not found errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail):
        """
        Initialize the NotFound error.

        Args:
            detail (str): A human-readable explanation of the resource not found error.
        """
        super().__init__(detail=detail, code='not_found')


class ServiceUnavailable(APIException):
    """
    Exception for service unavailable errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail):
        """
        Initialize the ServiceUnavailable error.

        Args:
            detail (str): A human-readable explanation of the service unavailable error.
        """
        super().__init__(detail=detail, code='service_unavailable')


# Human tasks:
# TODO: Review and potentially expand the list of custom exceptions based on specific project requirements
# TODO: Implement proper exception handling throughout the backend using these custom exceptions