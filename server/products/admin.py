from django.contrib import admin
from products.models import (Product, Category, StockItem,
                             Cart, CartItem, Purchase, PurchaseItem)

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(StockItem)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Purchase)
admin.site.register(PurchaseItem)
