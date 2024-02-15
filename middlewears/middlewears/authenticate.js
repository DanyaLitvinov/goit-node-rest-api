const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");

const User = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) next(HttpError(401, "Unauthorized"));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) next(HttpError(401));
    req.user = user;
    
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      next(HttpError(401, "JWT token is not valid")) 
    }
  }
};

module.exports = authenticate;
