from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser
from django.contrib.sessions.models import Session
from django.utils.http import urlencode
from django.utils.html import format_html


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("session_key", "expire_date",
                    'view_cart',)
    list_filter = ("session_key", "expire_date",)
    search_fields = ("session_key", 'expire_date', )

    def view_cart(self, obj):
        url = (
            f"http://localhost:8000/admin/products/cart/{obj.cart.id}"
        )
        return format_html(f'<a href="{url}">Cart - id:{obj.cart.id}</a>')

    view_cart.short_description = "Cart"
