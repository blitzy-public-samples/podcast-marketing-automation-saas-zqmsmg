from django.urls import path
from .views import MarketingContentListCreateView, MarketingContentRetrieveUpdateDestroyView, generate_marketing_content

app_name = 'marketing'

urlpatterns = [
    path('content/', MarketingContentListCreateView.as_view(), name='marketing-content-list-create'),
    path('content/<int:pk>/', MarketingContentRetrieveUpdateDestroyView.as_view(), name='marketing-content-detail'),
    path('generate/', generate_marketing_content, name='generate-marketing-content'),
]

# Human Tasks:
# TODO: Review and confirm the URL patterns align with the API design and frontend requirements
# TODO: Ensure proper naming conventions are followed for URL patterns