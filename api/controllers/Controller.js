const { User } = require("../models");

class Controller {
  // REGISTER
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
