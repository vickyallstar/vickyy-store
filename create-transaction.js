const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
    isProduction: false, // Gunakan true untuk mode produksi
    serverKey: process.env.MIDTRANS_SERVER_KEY, // Gunakan environment variable di Vercel
});

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { amount, productName } = req.body;

        const transactionDetails = {
            transaction_details: {
                order_id: "order-" + new Date().getTime(),
                gross_amount: amount,
            },
            item_details: [
                {
                    id: "item1",
                    price: amount,
                    quantity: 1,
                    name: productName,
                },
            ],
            customer_details: {
                first_name: "Pelanggan",
                email: "pelanggan@example.com",
            },
        };

        try {
            const transaction = await snap.createTransaction(transactionDetails);
            res.status(200).json({ token: transaction.token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Gagal membuat transaksi" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};