const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

class gLoginController {
  // GOOGLE LOGIN
  static async googleLogin(req, res, next) {
    const token = req.headers["google-token"];
    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create(
          {
            username: payload.email.split("@")[0],
            email: payload.email,
            password: Buffer.from(`${Math.random()}${Date.now}`).toString(
              "base64"
            ),
          },
          {
            hooks: false,
          }
        );
      }
      const access_token = createToken({
        id: user.id,
      });
      res.status(200).json({
        access_token,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = gLoginController;
