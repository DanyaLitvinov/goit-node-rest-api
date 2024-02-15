const controllerWrapper = require("../../helpers/controllerWraper");
const User = require("../../models/users");

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = controllerWrapper(logoutUser);
