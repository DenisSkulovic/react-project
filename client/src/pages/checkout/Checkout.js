import React from "react";
import Navbar from "../../components/navbar/Navbar";
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
      <Navbar className={"fixed"} />
      <div className="main with-navbar">
        <h2>Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </>
  );
}
