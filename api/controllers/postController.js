// const { User } = require("../models");

class postController {
  static async makePost(req, res, next) {
    try {
      console.log("post page");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = postController;
