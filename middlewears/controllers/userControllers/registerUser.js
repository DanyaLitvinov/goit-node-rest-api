const bcrypt = require("bcrypt");
const Users = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const gravatar = require('gravatar');


const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPsw = await bcrypt.hash(password, 10);
  
  try {
    const avatarURL = gravatar.url(email, {s: "300"})
    const result = await Users.create({
      email,
      password: hashedPsw,
      avatarURL,
    });
    res.status(201).json({ id: result._id, email, avatarURL });
  } catch (error) {
    if (error.message.includes("E11000")) {
      next(HttpError(409, "Not valid email"));
    }
  }
};

module.exports = registerUser;
