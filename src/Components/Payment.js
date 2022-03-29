import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RevolutCheckout from "@revolut/checkout";

const Payment = () => {
  const [name, setName] = useState(null);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState(null);
  const [billingAddress, setBillingAddress] = useState({
    countryCode: "",
    region: "",
    city: "",
    streetLine1: "",
    streetLine2: "",
    postcode: "",
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
          console.log(message)
          window.alert(message);
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
        setTimeout(() => {
          window.alert("Thank you! Payment completed"); 
        }, 1000); 
      },
      onError(message) {
        window.alert(`Oh no :( ${message}`);
      }
    });

    document
      .getElementById("button-submit")
      .addEventListener("click", function () {
        card.submit({
          name,
          email,
          billingAddress,
        });
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

  //============PAY WITH APPLE/GOOGLE PAY============
  const payWithRevolutApple = () => {
    const RC = RevolutCheckout(public_id);
    const paymentRequest = RC.paymentRequest({
      target: document.getElementById("revolut-payment-request"),
      requestShipping: true,
      shippingOptions: [
        {
          id: "prima",
          label: "avion",
          amount: 300,
          description: "cu avion ba fraiere",
        },
        {
          id: "a doua",
          label: "taxi",
          amount: 200,
          description: "cu taxi ba fraiere",
        },
        {
          id: "a treia",
          label: "train",
          amount: 100,
          description: "cu trenul ba fraiere",
        },
      ],
      // onShippingAddressChange: (selectedShippingAddress) => {
      //   console.log("selectedShippingAddress", selectedShippingAddress);
      // },
      onSuccess(message) {
        console.log("onSuccess", message);
        setResult("Paid");
      },
      onError(error) {
        console.log("onError", error);
        setResult(`Error: ${error.message}`);
      },
    });

    paymentRequest.canMakePayment().then((result) => {
      if (result) {
        console.log("can make payement", result);
        paymentRequest.render();
      } else {
        console.log("cannot make payement");
        setResult("Not supported");
        paymentRequest.destroy();
      }
    });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <div>
        <p>Use the folowing test cards for succesful payments:</p>
        <p>Visa: 4929420573595709</p>
        <p>Mastercard: 5281438801804148</p>
        <p>
          For expiry date use any future date, and for CVV any numbers you wish
        </p>
      </div>
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
          <label style={{ margin: "5px" }}>Full name: </label>
          <input
            name="full_name"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "stretch", minWidth: "400px" }}
        >
          <label style={{ margin: "5px" }}>Email: </label>
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
            name="countryCode"
            placeholder="Country Code"
            onChange={getBillingAddress}
          />
          <input
            name="region"
            placeholder="Region"
            onChange={getBillingAddress}
          />
          <input 
            name="city" 
            placeholder="City" 
            onChange={getBillingAddress} />
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
            placeholder="Postal Code"
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
        <button onClick={() => payWithRevolutApple()}>
          Pay with Revolut Apple
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
      <div id="revolut-payment-request"></div>
    </div>
  );
};

export default Payment;
