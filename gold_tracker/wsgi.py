"""
WSGI config for gold_tracker project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

settings_module = (
    "gold_tracker.production"
    if "WEBSITE_HOSTNAME" in os.environ
    else "gold_tracker.settings"
)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gold_tracker.settings")

application = get_wsgi_application()
