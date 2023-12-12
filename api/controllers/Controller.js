class controller {
  static async home(req, res, next) {
    try {
      res.send("welcome to homepage");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controller;
