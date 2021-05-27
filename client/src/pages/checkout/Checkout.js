import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import "./Checkout.scss";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import { makeSelect_Payment_payment } from "../../redux/payment/selectors";
import PaymentDetail from "../../components/payment/PaymentDetail";
import { useSelector } from "react-redux";
import { makeSelect_Cart_cartItems } from "../../redux/cart/selectors";
import { useHistory } from "react-router-dom";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

const stripePromise = loadStripe(
  "pk_test_51Ioo1uLg0qQUGRvgfEKfAWwCwJDFfA0yNQDl0GG9hbeRPVaLXEKu9TmXvkHXxy78btKbKugOrNWHdOi2qaxflbf200CiAK0vmn"
);

export default function Checkout() {
  const paymentSelector = useSelector(makeSelect_Payment_payment);
  const cartItemsSelector = useSelector(makeSelect_Cart_cartItems);
  const history = useHistory();

  useEffect(() => {
    if (parseInt(window.sessionStorage.getItem("cart_length")) === 0) {
      console.log("cartItemsSelector.cart_items", cartItemsSelector.cart_items);
      history.goBack();
    }
  }, [parseInt(window.sessionStorage.getItem("cart_length"))]);
  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <Cart />
      <div className="main with-navbar with-cart">
        <div className="container">
          <div className="checkout-container  w-100 d-flex justify-content-center">
            <div className="checkout-wrapper">
              <h2>Checkout</h2>
              {Object.keys(paymentSelector.payment).length === 0 && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
          {cartItemsSelector.cart_items.length === 0 &&
            Object.keys(paymentSelector.payment).length > 0 && (
              <PaymentDetail payment={paymentSelector.payment} />
            )}
        </div>
      </div>
    </>
  );
}
