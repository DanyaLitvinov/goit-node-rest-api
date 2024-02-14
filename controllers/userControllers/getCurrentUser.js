const User = require("../../models/users");
const controllerWrapper = require("../../helpers/controllerWraper");
const HttpError = require("../../helpers/HttpError");

const getCurrentUser = async (req, res, next) => {
  const { authorization } = req.headers;

  const [_, token] = authorization.split(" ");

  const user = await User.findOne({ token }).select("-password");
  if (!user) throw HttpError(401);

  res.status(200).json(user);
};

module.exports = controllerWrapper(getCurrentUser);
