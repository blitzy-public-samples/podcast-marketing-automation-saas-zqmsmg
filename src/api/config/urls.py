from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.authentication.urls')),
    path('api/podcasts/', include('apps.podcasts.urls')),
    path('api/episodes/', include('apps.episodes.urls')),
    path('api/transcripts/', include('apps.transcripts.urls')),
    path('api/marketing/', include('apps.marketing.urls')),
    path('api/social-media/', include('apps.social_media.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Custom 404 and 500 error handlers
handler404 = 'apps.core.views.custom_404'
handler500 = 'apps.core.views.custom_500'

# API versioning
API_VERSION = 'v1'
for i, pattern in enumerate(urlpatterns):
    if pattern.pattern.regex.pattern.startswith('^api/'):
        urlpatterns[i] = path(f'api/{API_VERSION}/', include([pattern]))

# Pending human tasks:
# TODO: Review and ensure all necessary API endpoints are included
# TODO: Implement proper versioning for API endpoints if not already done
# TODO: Set up a custom 404 and 500 error handlers if needed