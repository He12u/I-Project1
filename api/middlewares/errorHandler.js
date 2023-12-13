const errorHandler = async (error, req, res, next) => {
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    let message = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json(message);
  } else if (error.name === "404") {
    res.status(404).json({ message: "Invalid email or password" });
  } else if (error.name === "400") {
    res.status(400).json({ message: "Invalid email or password" });
  } else if (error.name === "401") {
    res.status(401).json({ message: "Unauthorized access" });
  } else if (error.name === "403") {
    res.status(403).json({ message: "Forbiden Access" });
  }
};

module.exports = errorHandler;
