from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import QuerySet
from rest_framework.request import Request
from typing import Any, Dict

class CustomPageNumberPagination(PageNumberPagination):
    """
    Custom pagination class that extends PageNumberPagination from DRF.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def __init__(self):
        """
        Initializes the CustomPageNumberPagination class.
        """
        super().__init__()

    def get_paginated_response(self, data: Any) -> Response:
        """
        Overrides the default get_paginated_response to include custom metadata.

        Args:
            data (Any): The paginated data to be included in the response.

        Returns:
            Response: A Response object with paginated data and custom metadata.
        """
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })

def paginate_queryset(queryset: QuerySet, request: Request, page_size: int) -> Dict[str, Any]:
    """
    A utility function to paginate a given queryset.

    Args:
        queryset (QuerySet): The queryset to be paginated.
        request (Request): The request object containing pagination parameters.
        page_size (int): The number of items per page.

    Returns:
        dict: A dictionary containing paginated data and metadata.
    """
    paginator = CustomPageNumberPagination()
    paginator.page_size = page_size
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    return {
        'results': paginated_queryset,
        'count': paginator.page.paginator.count,
        'next': paginator.get_next_link(),
        'previous': paginator.get_previous_link()
    }

# Human tasks:
# 1. Review and adjust the default page_size and max_page_size values based on application requirements
# 2. Implement additional pagination methods (e.g., cursor pagination) if needed for specific API endpoints