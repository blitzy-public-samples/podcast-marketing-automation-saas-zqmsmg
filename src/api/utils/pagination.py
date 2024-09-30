from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.core.paginator import EmptyPage, PageNotAnInteger


class CustomPagination(PageNumberPagination):
    """
    A custom pagination class that extends PageNumberPagination from DRF with additional features.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        """
        Returns a custom paginated response with additional metadata.

        Args:
            data (list): The list of items for the current page.

        Returns:
            Response: A DRF Response object with paginated data and metadata.
        """
        # Calculate total pages
        total_pages = self.page.paginator.num_pages

        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'total_pages': total_pages,
            'results': data
        })


def get_pagination_params(request):
    """
    Extracts and validates pagination parameters from the request query params.

    Args:
        request (Request): The request object containing query parameters.

    Returns:
        tuple: A tuple containing (page, page_size).
    """
    # Extract page and page_size from request.query_params
    page = request.query_params.get('page', 1)
    page_size = request.query_params.get('page_size', 10)

    # Validate page and page_size
    try:
        page = int(page)
        page_size = int(page_size)
    except ValueError:
        # If conversion fails, use default values
        page = 1
        page_size = 10

    # Apply default values if not provided or invalid
    page = max(1, page)  # Ensure page is at least 1
    page_size = max(1, min(100, page_size))  # Ensure page_size is between 1 and 100

    return page, page_size


# Human tasks (commented list):
# TODO: Implement error handling for invalid pagination parameters
# TODO: Add unit tests for CustomPagination class and get_pagination_params function
# TODO: Consider adding support for cursor-based pagination for large datasets