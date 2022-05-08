const CheckoutSandbox = async (sum, currency, history) => {
  let data = { amount: sum*100, currency };

  try {
    await fetch("/card/newOrderSandbox", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .then((body) => {
        history.push("/cardSandbox", body);
      });
  } catch (err) {
    console.error(err);
  }
};

export default CheckoutSandbox;
