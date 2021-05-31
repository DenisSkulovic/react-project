import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./About.scss";

export default function About() {
  return (
    <div className="about-page">
      <Navbar className={"fixed"} />
      <div className="main with-navbar">
        <div className="container d-flex flex-row flex-wrap justify-content-around">
          <div className="about-wrapper col-11 col-md-9 col-lg-7 col-xl-7 mb-4">
            <div className="about">
              <h3>About</h3>
              <p>This project uses <strong>Django REST API</strong> as the backend and <strong>React</strong> for the frontend.</p>
              <p>Most information is processed at the backend (i.e. button clicks send requests to the backend and receive JSON responses).</p>
              <h4>Authentication</h4>
              <p>The store supports both anonymous and authenticated purchases. The cart is connected to the session key of a user, and to the user account in case a user is authenticated. The <strong>session key</strong> and the <strong>authentication token</strong> are stored in the sessionStorage of the browser.</p>
              <p>On login the previously anonymous cart is connected to the current user.</p>
              <p>On session expiry the cart is eliminated and cart items are returned to the warehouse.</p>
              <h4>Checkout</h4>
              <p>Once the user leaves their card and shipping details, a request is sent to Stripe. On success, the cart items in the backend are converted to purchase items and the payment is stored, available to later review in case the purchase was authenticated.</p>
            </div>
          </div>
          <div className="contacts-wrapper col-11 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="contacts">
              <h4>Contact Details</h4>
              <div className="table-contanier">
                <div className="table-wrapper">
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <td>Full Name:</td>
                        <td>Denis Skulovic</td>
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td>+972-585-615800</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>dskulovich@gmail.com</td>
                      </tr>
                      <tr>
                        <td>City:</td>
                        <td>Tel Aviv-Yafo</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>Derech Namir 102</td>
                      </tr>
                      <tr>
                        <td>LinkedIn:</td>
                        <td><a href="https://www.linkedin.com/in/denis-skulovi%C4%8D-34880712b/">link</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
