import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Checkout from "./Checkout";

function Home() {
  const [currency, setCurrency] = useState("USD");
  const [searchfield, setSearchfield] = useState("");
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const currencies = ["USD", "EUR", "GBP", "RON"];

  const items = [
    { name: "Backpack", price: 150 },
    { name: "Hat", price: 15 },
    { name: "Jacket", price: 300 },
    { name: "Boots", price: 250 },
    { name: "Skis", price: 600 },
    { name: "Gloves", price: 10 },
    { name: "Shirt", price: 20 },
    { name: "Pants", price: 25 },
    { name: "Glasses", price: 40 },
    { name: "Snowboard", price: 500 },
  ];

  let history = useHistory()

  useEffect(() => {
    const reducer = (prevVal, currVal) => prevVal + currVal;
    setSum(cart.map((item) => item.price).reduce(reducer, 0));
  }, [cart]);

  const addToCart = (i) => {
    setCart([...cart, items[i]]);
  };

  const removeFromCart = (i) => {
    cart.splice(i, 1);
    setCart([...cart]);
  };


  return (
    <div>
      <h1> Revolut Shop </h1>
      <div
        className="container"
        style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}
      >
        <div className="items">
          <div
            className="searchAndCurrency"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <p style={{ display: "inline-block", margin: "5px" }}>
                Search item:
              </p>
              <input
                onChange={(event) => {
                  setSearchfield(event.target.value);
                }}
              ></input>
            </div>
            <div className="Currency">
              <select
                onChange={(event) => setCurrency(event.target.value)}
                placeholder="USD"
              >
                {currencies.map((currency) => (
                  <option key={currency}> {currency} </option>
                ))}
              </select>
            </div>
          </div>
          <div className="itemsList" style={{ textAlign: "left" }}>
            <ul>
              {items
                .filter((item) =>
                  item.name.toLowerCase().includes(searchfield.toLowerCase())
                )
                .map((item, i) => {
                  return (
                    <li key= {i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "5px",
                      }}
                    >
                      {item.name} Price:{" "}
                      {currency === "USD"
                        ? Math.round(Number(item.price))
                        : currency === "GBP"
                        ? Math.round(Number(item.price) * 0.74)
                        : currency === "EUR"
                        ? Math.round(Number(item.price) * 0.87)
                        : Math.round(Number(item.price) * 4.28)}{" "}
                      {currency}
                      <button
                        onClick={() => {
                          addToCart(i);
                        }}
                      >
                        Add to cart
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="Cart" style={{ textAlign: "center" }}>
          {cart.length > 0 ? (
            <div>
              <h2>Cart</h2>
              <ul style={{ listStyle: "none" }}>
                {cart.map((item, i) => {
                  return (
                    <li key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "40%",
                        margin: "0 auto",
                      }}
                    >
                      {item.name}
                      <button
                        onClick={() => removeFromCart(i)}
                        style={{ margin: "5px" }}
                      >
                        Remove from Cart
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button onClick={()=> Checkout(sum, currency, history)}>
                {" "}
                Go to Checkout
              </button>
              <p>
                Total:{" "}
                {currency === "GBP"
                  ? Math.round(sum * 0.74)
                  : currency === "EUR"
                  ? Math.round(sum * 0.87)
                  : currency === "RON"
                  ? Math.round(sum * 4.28)
                  : Math.round(sum)}{" "}
                {currency}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
