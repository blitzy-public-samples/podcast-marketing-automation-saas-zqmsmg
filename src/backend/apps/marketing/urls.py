from django.urls import path
from .views import MarketingContentListCreateView, MarketingContentDetailView, GenerateMarketingContentView

app_name = "marketing"

urlpatterns = [
    path("", MarketingContentListCreateView.as_view(), name="marketing_content_list_create"),
    path("<int:pk>/", MarketingContentDetailView.as_view(), name="marketing_content_detail"),
    path("generate/", GenerateMarketingContentView.as_view(), name="generate_marketing_content"),
]

# Human tasks:
# TODO: Review URL patterns to ensure they align with the API design and RESTful principles
# TODO: Consider adding versioning to the API endpoints if not handled at a higher level