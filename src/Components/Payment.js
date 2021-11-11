import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RevolutCheckout from "@revolut/checkout";

const Payment = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [billingAddress, setBillingAddress] = useState({
    country: "",
    city: "",
    postcode: "",
    streetLine1: "",
    streetLine2: "",
  });

  console.log(billingAddress);
  const getBillingAddress = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  //============PAY WITH POPUP============
  
  let public_id = useHistory().location.state;

  const payWithPopup = () =>
    RevolutCheckout(public_id, "sandbox").then(function (instance) {
      instance.payWithPopup({
        onSuccess() {
          window.alert("Thank you! Payment was succesful");
        },
        onError(message) {
          window.alert("Oh no :( you broke! or something wrong in the code");
        },
        name,
        email,
      });
    });

  //============PAY WITH CARDFIELD============

  RevolutCheckout(public_id, "sandbox").then(function (instance) {
    var card = instance.createCardField({
      target: document.getElementById("card-field"),
      onSuccess() {
        window.alert("Thank you!");
      },
      onError(message) {
        window.alert("Oh no :(");
      },
      name,
      email,
      billingAddress,
    });

    document
      .getElementById("button-submit")
      .addEventListener("click", function () {
        card.submit();
      });
  });

  //============PAY WITH REVOLUTPAY============

  const payWithRevolutPay = () => {
    RevolutCheckout(public_id, "sandbox").then(function (instance) {
      instance.revolutPay({
        target: document.getElementById("revolut-pay"),
        phone: "+441632960022", // recommended
        onSuccess() {
          console.log("Payment completed");
        },
        onError(error) {
          console.error("Payment failed: " + error.message);
        },
      });
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "15%",
          margin: " 0 auto",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <label style={{margin:'5px'}}>Full name: </label>
          <input
            name="full_name"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "stretch", minWidth:'400px' }}>
          <label style={{margin:'5px'}}>Email: </label>
          <input 
            name="email"
            placeholder="customer@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Card</label>
          <div name="card"></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Billing Address</label>

          <input
            name="country"
            placeholder="Country"
            onChange={getBillingAddress}
          />
          <input
            name="city"
            placeholder="City"
            onChange={getBillingAddress}
          />
          <input
            name="streetLine1"
            placeholder="Address line 1"
            onChange={getBillingAddress}
          />
          <input
            name="streetLine2"
            placeholder="Address line 2"
            onChange={getBillingAddress}
          />
          <input
            name="postcode"
            placeholder="Postal"
            onChange={getBillingAddress}
          />
        </div>
      </form>
      <div
        style={{
          width: "400px",
          margin: "10px auto",
          border: "solid black 3px",
          borderRadius: "10px",
          padding: "6px",
        }}
        id="card-field"
      ></div>
      <div
        className="payButtons"
        style={{
          margin: "10px auto",
          display: "flex",
          justifyContent: "space-between",
          width: "20%",
        }}
      >
        <button id="button-submit">Pay with Card</button>
        <button onClick={() => payWithPopup()}>Pay with Popup</button>
        <button onClick={() => payWithRevolutPay()}>
          Pay with Revolut Pay
        </button>
      </div>
      <div
        style={{
          width: "400px",
          margin: "10px auto",
          borderRadius: "10px",
          padding: "6px",
        }}
        id="revolut-pay"
      ></div>
    </div>
  );
};

export default Payment;
