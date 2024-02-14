const controllerWrapper = require("../../helpers/controllerWraper");
const path = require("path");
const fs = require("fs/promises");
const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");
const { resizeAvatar } = require("../../middlewears");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  if (!req.file) next(HttpError(400, "No upload images"));

  const { path: tempUpload, originalname } = req.file;

  await resizeAvatar(tempUpload);

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = controllerWrapper(updateAvatar);
