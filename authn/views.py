from typing import override
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.request import Request


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    @override
    def post(self, request: Request, format=None):
        serializer = AuthTokenSerializer(data=request.data)

        _ = serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        login(request, user)

        return super(LoginView, self).post(request, format=None)
