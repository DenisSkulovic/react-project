from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator

User = get_user_model()


KG = "kg"
LITER = "l"
GRAM = "g"
MILIGRAM = "mg"
MILILITER = "ml"
ITEM = "item"


class Category(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'


class Product(models.Model):
    UNIT_CHOICES = [(LITER, "l"), (MILILITER, "ml"),
                    (KG, "kg"), (GRAM, "g"), (MILIGRAM, "mg"), (ITEM, "item")]

    name = models.CharField(max_length=50, null=False, blank=False)
    image = models.URLField(null=False, blank=False)
    unit = models.CharField(choices=UNIT_CHOICES, max_length=50)
    unit_price = models.FloatField(default=0, null=False, blank=False, validators=[
        MinValueValidator(0.0)])
    category = models.ForeignKey(
        to=Category, on_delete=models.CASCADE, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} - {self.category} - {self.unit}'


class StockItem(models.Model):
    product = models.OneToOneField(
        to=Product, on_delete=models.CASCADE, null=False, blank=False)
    quantity = models.PositiveIntegerField(default=0, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.product} - {self.quantity}'


class Cart(models.Model):
    customer = models.ForeignKey(
        to=User, on_delete=models.PROTECT, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.customer} - created: {self.created_date} - modified: {self.modified_date}'


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
        return f'{self.product} - {self.quantity} - {self.price}'


class Purchase(models.Model):
    customer = models.ForeignKey(
        to=User, on_delete=models.PROTECT, null=False, blank=False)
    total_paid = models.FloatField(
        default=0, validators=[MinValueValidator(0.0)], null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.customer} - {self.total_paid}'


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
        return f'{self.product} - {self.quantity} - {self.price}'
