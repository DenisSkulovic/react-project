from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator

User = get_user_model()


class Category(models.Model):
    category = models.CharField(max_length=50, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.category}'


class Product(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    image = models.URLField(null=False, blank=False)
    price = models.FloatField(default=0, null=False, blank=False, validators=[
        MinValueValidator(0.0)])
    category = models.ForeignKey(
        to=Category, on_delete=models.CASCADE, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.category}'


class StockItem(models.Model):
    product = models.OneToOneField(
        to=Product, on_delete=models.CASCADE, null=False, blank=False)
    quantity = models.PositiveIntegerField(default=0, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.quantity}'


class Cart(models.Model):
    customer = models.ForeignKey(
        to=User, on_delete=models.PROTECT, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


class CartItem(models.Model):
    product = models.ForeignKey(
        to=Product, on_delete=models.CASCADE, null=False, blank=False)
    quantity = models.PositiveIntegerField(default=0, null=False, blank=False)
    # price at action, in case it changes after action but before purchase
    price = models.FloatField(default=0, null=False, blank=False, validators=[
        MinValueValidator(0.0)])
    cart = models.ForeignKey(
        to=Cart, on_delete=models.PROTECT, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.product.name} - {self.quantity} - {self.price}'


class Purchase(models.Model):
    customer = models.ForeignKey(
        to=User, on_delete=models.PROTECT, null=False, blank=False)
    total_paid = models.FloatField(
        default=0, validators=[MinValueValidator(0.0)], null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)


class PurchaseItem(models.Model):
    product = models.ForeignKey(
        to=Product, on_delete=models.PROTECT, null=False, blank=False)
    quantity = models.PositiveIntegerField(default=0, null=False, blank=False)
    # price at purchase moment, to record de facto sale amount
    price = models.FloatField(default=0, null=False, blank=False, validators=[
        MinValueValidator(0.0)])
    purchase = models.ForeignKey(
        to=Purchase, on_delete=models.PROTECT, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.product.name} - {self.quantity} - {self.price}'
