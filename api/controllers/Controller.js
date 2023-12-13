const { comparePassword } = require("../helpers/bcryptjs");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

class Controller {
  // REGISTER
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
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

  // LOGIN
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "404" };
      }

      const validatePassword = comparePassword(password, user.password);

      if (!validatePassword) {
        throw { name: "400" };
      }

      const access_token = createToken({
        id: user.id,
      });

      res.status(200).json({
        access_token,
        email: user.email,
        isMember: user.isMember,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
}

module.exports = Controller;
