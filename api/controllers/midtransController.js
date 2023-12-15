const midtransClient = require("midtrans-client");
const { User } = require("../models");

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

  static async updateMember(req, res, next) {
    try {
      const { id } = req.user;
      await User.update({ isMember: true }, { where: { id }, returning: true });
      res.status(200).json({ message: "succes update member" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = midtransController;
