from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# paginate getting all products
class AllProductsView(APIView):

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class CategoryProductsView(APIView):

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class CartView(APIView):
    permission_classes = (IsAuthenticated,)             # <-- And here

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)
