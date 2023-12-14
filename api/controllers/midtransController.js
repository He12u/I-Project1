const midtransClient = require("midtrans-client");

class midtransController {
  // GET MIDTRANS TOKEN
  static async getToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: `${Date.now()} ${req.user.id}`,
          gross_amount: 10000,
        },
      };

      const response = await snap.createTransaction(parameter);

      res.json(response);
    } catch (error) {}
  }
}

module.exports = midtransController;
