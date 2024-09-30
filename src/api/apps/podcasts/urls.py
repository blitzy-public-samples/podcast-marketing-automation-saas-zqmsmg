from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PodcastViewSet

router = DefaultRouter()
router.register(r'podcasts', PodcastViewSet)

app_name = 'podcasts'

urlpatterns = [
    path('', include(router.urls)),
]

# Human Tasks:
# TODO: Review and adjust URL patterns if additional custom actions are added to the PodcastViewSet (Optional)
# TODO: Ensure proper naming conventions are followed for all URL patterns (Required)
# TODO: Verify that all necessary podcast-related endpoints are included in the router (Required)