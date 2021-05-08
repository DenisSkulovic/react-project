import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
// import LoaderButton from "./LoaderButton";
import "./CheckoutForm.scss";

const handleSubmit = (stripe, elements) => async () => {
  const cardElement = elements.getElement(CardElement);

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: cardElement,
  });

  if (error) {
    console.log("[error]", error);
  } else {
    console.log("[PaymentMethod]", paymentMethod);
    // ... POST: /api/charge/user
  }
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <Container>
      <h1>stripe form</h1>
      <CardElement />
      <Button
        block
        variant={"success"}
        onClick={handleSubmit(stripe, elements)}
      >
        Buy
      </Button>
    </Container>
  );
}

export default CheckoutForm;
