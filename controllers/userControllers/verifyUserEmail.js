const HttpError = require("../../helpers/HttpError");
const controllerWrapper = require("../../helpers/controllerWraper")
const Users = require("../../models/users");

const verifyUserEmail = async (req, res) => { 
    const { verificationToken } = req.params;

    const user = await Users.findOne({ verificationToken });

    if (!user) throw HttpError(404, "User not found");

    await Users.findByIdAndUpdate(user._id, {
      isVerifyed: true,
      verificationToken: null,
    });

    res.status(200).json({message: "Email confirmed"})
}

module.exports = controllerWrapper(verifyUserEmail); 