const { isValidObjectId } = require("mongoose");
const HttpError = require("./Error");

const IdValidation = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(404, `${id} is not valid id`));
  }
  next();
};

module.exports = IdValidation;
