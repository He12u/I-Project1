const errorHandler = async (error, req, res, next) => {
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    let message = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json(message);
  }
};

module.exports = errorHandler;
