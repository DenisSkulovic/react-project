import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import LoaderButton from "./LoaderButton";
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutForm.scss";
import { pay } from "../../redux/payment/actions";
import { makeSelect_Payment_processing } from "../../redux/payment/selectors";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const processingSelector = useSelector(makeSelect_Payment_processing);

  const handleSubmit = async (stripe, elements) => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      const inputs = document.querySelectorAll(
        "form.payment-form input:not([type='submit'])"
      );
      let data = {};
      inputs.forEach((input) => {
        data[input.name] = input.value;
      });
      dispatch(pay(data));
    }
  };

  return (
    <div className="container">
      <h1>Stripe form</h1>
      <CardElement />
      <form
        action="#"
        className="payment-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(stripe, elements);
        }}
      >
        <div className="form-group">
          <label htmlFor="full_name" hidden>
            Full Name
          </label>
          <input
            autoComplete="name"
            className="form-control"
            type="text"
            name="full_name"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" hidden>
            Country
          </label>
          <input
            autoComplete="country"
            className="form-control"
            type="text"
            name="country"
            placeholder="Country"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" hidden>
            Address
          </label>
          <input
            autoComplete="street-address"
            className="form-control"
            type="text"
            name="address"
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" hidden>
            City
          </label>
          <input
            autoComplete="address-level2"
            className="form-control"
            type="text"
            name="city"
            placeholder="City"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state" hidden>
            State
          </label>
          <input
            autoComplete="address-level1"
            className="form-control"
            type="text"
            name="state"
            placeholder="State"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip_code" hidden>
            Zip Code
          </label>
          <input
            autoComplete="postal-code"
            className="form-control"
            type="text"
            name="zip_code"
            placeholder="Zip Code"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" hidden>
            Phone
          </label>
          <input
            autoComplete="tel"
            className="form-control"
            type="text"
            name="phone"
            placeholder="Phone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" hidden>
            Email
          </label>
          <input
            autoComplete="email"
            className="form-control"
            type="text"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <input
          type="submit"
          className="btn-block btn btn-success"
          value="Buy"
        ></input>
      </form>
    </div>
  );
}

export default CheckoutForm;
