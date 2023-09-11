const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config");

const VerifyTokenUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "No Access Token",
    });

  try {
    const decoded = jwt.verify(token, accessTokenSecret);

    if (!decoded.id_user)
      return res.status(401).json({
        code: "401",
        status: "UNAUTHORIZED",
        errors: "Please Login as User!!",
      });

    next();
  } catch (error) {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: error.message,
    });
  }
};

module.exports = VerifyTokenUser;
