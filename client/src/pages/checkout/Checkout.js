import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Cart from "../../components/cart/Cart";
import "./Checkout.scss";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckoutForm from "../../components/checkout/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Ioo1uLg0qQUGRvgfEKfAWwCwJDFfA0yNQDl0GG9hbeRPVaLXEKu9TmXvkHXxy78btKbKugOrNWHdOi2qaxflbf200CiAK0vmn"
);

export default function Checkout() {
  return (
    <>
      <Navbar className={"fixed with-cart"} />
      <Cart />
      <div className="main with-navbar with-cart">
        <div className="container">
          <h2>Checkout</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
}
