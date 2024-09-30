from rest_framework.exceptions import APIException as DRFAPIException

class APIException(DRFAPIException):
    """
    Base exception class for API-related errors in the Podcast Marketing Automation SaaS platform.
    """
    def __init__(self, detail, code):
        super().__init__(detail, code)
        self.detail = detail
        self.code = code

class NotFoundError(APIException):
    """
    Exception raised when a requested resource is not found.
    """
    def __init__(self, detail):
        super().__init__(detail=detail, code='not_found')

class ValidationError(APIException):
    """
    Exception raised when input data fails validation.
    """
    def __init__(self, detail):
        super().__init__(detail=detail, code='validation_error')

class AuthenticationError(APIException):
    """
    Exception raised when authentication fails.
    """
    def __init__(self, detail):
        super().__init__(detail=detail, code='authentication_failed')

class PermissionDeniedError(APIException):
    """
    Exception raised when a user doesn't have permission to perform an action.
    """
    def __init__(self, detail):
        super().__init__(detail=detail, code='permission_denied')

class ThrottlingError(APIException):
    """
    Exception raised when a request is throttled.
    """
    def __init__(self, detail):
        super().__init__(detail=detail, code='throttled')

# Human tasks:
# TODO: Review and potentially expand the list of custom exceptions based on specific API requirements
# TODO: Implement exception handling middleware to catch and format these custom exceptions