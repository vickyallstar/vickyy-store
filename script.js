function buyProduct(amount, productName) {
    fetch("/api/create-transaction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amount,
            productName: productName,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        window.snap.pay(data.token);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}