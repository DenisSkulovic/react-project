import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { makeSelect_Payment_payment } from "../../redux/payment/selectors";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_Cart_cartItems } from "../../redux/cart/selectors";
import { getCart } from "../../redux/cart/actions";

export default function CartList() {
  const dispatch = useDispatch();
  const paymentSelector = useSelector(makeSelect_Payment_payment);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cartSelector = useSelector(makeSelect_Cart_cartItems);

  return (
    <div className="cart-list-wrapper">
      <div className="cart-list">
        {cartSelector.cart_items &&
          cartSelector.cart_items.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        {cartSelector.cart_items.length === 0 && (
          <div className="no-cart-items-wrapper">
            <div className="no-cart-items">
              {paymentSelector.payment
                ? "Thank you for the purchase!"
                : "Your cart is empty"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
