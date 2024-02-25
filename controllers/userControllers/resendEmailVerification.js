const HttpError = require("../../helpers/HttpError");
const controllerWrapper = require("../../helpers/controllerWraper");
const sendEmail = require("../../helpers/sendEmail");
const Users = require("../../models/users");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendEmailVerification = async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ email });

  if (!user) throw HttpError(404, "User not found");
  if (user.isVerifyed)
    throw HttpError(400, "Verification has already been passed");

  const verificationEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm email</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(200).json({ message: "Verification email has been sent" });
};

module.exports = controllerWrapper(resendEmailVerification);
