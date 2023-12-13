const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "401" };
    }

    bearerToken = bearerToken.split(" ")[1];

    const verified = verifyToken(bearerToken);

    const user = await User.findByPk(verified.id);
    if (!user) {
      throw { name: "401" };
    }

    req.user = {
      id: user.id,
      isAdmin: user.isAdmin,
      isMember: user.isMember,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
