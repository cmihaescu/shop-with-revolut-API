const Checkout = async (sum, currency, history) => {
  let data = { amount: sum*100, currency };

  try {
    await fetch("/card/newOrder", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.public_id)
      .then((publicId) => {
        history.push("/card", publicId);
      });
  } catch (err) {
    console.error(err);
  }
};

export default Checkout;
