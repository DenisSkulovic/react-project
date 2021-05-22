from django.contrib import admin
from products.models import (Product, Category, StockItem,
                             Cart, CartItem, Purchase, PurchaseItem)
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "unit", 'unit_price',
                    'view_category', 'created_date', 'modified_date')
    list_filter = ("name", "unit", 'unit_price',
                   'created_date', 'modified_date')
    search_fields = ("name", )

    def view_category(self, obj):
        url = (
            f"http://localhost:8000/admin/products/category/{obj.category.id}"
        )
        return format_html(f'<a href="{url}">{obj.category.name}</a>')
    view_category.short_description = "Category"

    # def view_cart_items(self, obj):


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", 'view_products',
                    'created_date', 'modified_date')
    list_filter = ("name", 'created_date', 'modified_date')

    def view_products(self, obj):
        count = obj.product_set.count()
        url = (
            reverse("admin:products_product_changelist")
            + "?"
            + urlencode({"category__id__exact": f"{obj.id}"})
        )
        return format_html(f'<a href="{url}">{count} Products</a>')
    view_products.short_description = "Products"


@admin.register(StockItem)
class StockItemAdmin(admin.ModelAdmin):
    list_display = ("id", "view_product", "quantity",
                    'created_date', 'modified_date')
    list_filter = ("quantity",
                   'created_date', 'modified_date')

    def view_product(self, obj):
        url = (
            reverse("admin:products_product_changelist")
            + f"{obj.product.id if obj.product else ''}"
        )
        return format_html(f'<a href="{url}">{obj.product.name}</a>' if obj.product else 'No Product')
    view_product.short_description = "Product"


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "view_customer", "view_session",
                    'view_cart_items', 'created_date', 'modified_date')
    list_filter = ('created_date', 'modified_date')

    def view_session(self, obj):
        url = (
            reverse("admin:sessions_session_changelist")
            + "?"
            + urlencode({"session_key": f"{obj.session.session_key}"})
        )
        return format_html(f'<a href="{url}">Session</a>')
    view_session.short_description = "Session"

    def view_cart_items(self, obj):
        count = obj.cartitem_set.count()
        url = (
            reverse("admin:products_cartitem_changelist")
            + "?"
            + urlencode({"cart__id": f"{obj.id}"})
        )
        return format_html(f'<a href="{url}">{count} Cart Items</a>' if count > 0 else "No Cart Items")
    view_cart_items.short_description = "Cart Items"

    def view_customer(self, obj):
        url = (
            reverse("admin:users_customuser_changelist")
            + f"{obj.customer.id if obj.customer else ''}"
        )
        return format_html(f'<a href="{url}">{obj.customer.email}</a>' if obj.customer else "No Customer")
    view_customer.short_description = "Customer"


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "quantity", 'price',
                    "view_cart", 'created_date', 'modified_date')
    list_filter = ("product", "quantity", 'price',
                   'created_date', 'modified_date')

    def view_cart(self, obj):
        url = (
            reverse("admin:products_cart_changelist")
            +
            f"{obj.cart.id}"
        )
        return format_html(f'<a href="{url}">Cart - id:{obj.cart.id}</a>')
    view_cart.short_description = "Cart"


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ("id", 'view_customer', 'view_session',
                    "total_paid", 'view_purchase_items', 'created_date', 'modified_date')
    list_filter = ("total_paid",
                   'created_date', 'modified_date')

    def view_customer(self, obj):
        url = (
            reverse("admin:users_customuser_changelist")
            + f"{obj.customer.id if obj.customer else ''}"
        )
        return format_html(f'<a href="{url}">{obj.customer.email}</a>' if obj.customer else "No Customer")
    view_customer.short_description = "Customer"

    def view_session(self, obj):
        url = (
            reverse("admin:sessions_session_changelist")
            + "?"
            + urlencode({"session_key": f"{obj.session.session_key if obj.session else ''}"})
        )
        return format_html(f'<a href="{url}">{obj.session.session_key}</a>' if obj.session else 'No Session')
    view_session.short_description = "Session"

    def view_purchase_items(self, obj):
        count = obj.purchaseitem_set.count()
        url = (
            reverse("admin:products_purchaseitem_changelist")
            + "?"
            + urlencode({"purchase__id": f"{obj.id}"})
        )
        return format_html(f'<a href="{url}">{count} Purchase Items</a>' if count > 0 else "No Purchase Items")
    view_purchase_items.short_description = "Purchase Items"


@admin.register(PurchaseItem)
class PurchaseItemAdmin(admin.ModelAdmin):
    list_display = ("id", 'product', 'view_product', 'quantity',
                    'price', "view_purchase", 'created_date', 'modified_date')
    list_filter = ('quantity', 'product',
                   'price', 'created_date', 'modified_date')

    def view_purchase(self, obj):
        url = (
            reverse("admin:products_purchase_changelist")
            + f"{obj.purchase.id if obj.purchase else ''}"
        )
        return format_html(f'<a href="{url}">{obj.purchase.created_date}</a>' if obj.purchase else "No Purchase")
    view_purchase.short_description = "Purchase"

    def view_product(self, obj):
        url = (
            reverse("admin:products_product_changelist")
            + f"{obj.product.id if obj.product else ''}"
        )
        return format_html(f'<a href="{url}">link</a>' if obj.product else 'No Product')
    view_product.short_description = "Product link"
