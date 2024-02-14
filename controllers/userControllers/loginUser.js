const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const controllerWrapper = require("../../helpers/controllerWraper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Wrong password or email");

  const isValidPsw = await bcrypt.compare(password, user.password);
  if (!isValidPsw) throw HttpError(401, "Wrong password or email");

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token});

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = controllerWrapper(loginUser);
