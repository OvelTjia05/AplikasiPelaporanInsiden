const jwt = require("jsonwebtoken");
const User = require("../User/model");
const bcrypt = require("bcrypt");

const { accessTokenSecret, refreshTokenSecret } = require("../../config");

//@description     Register User
//@route           POST /auth/user/register
//@access          Public
const registerUser = async (req, res) => {
  const { username, password, konfirmasi_password } = req.body;

  if (username && password && konfirmasi_password) {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user)
        return res.status(409).json({
          code: "409",
          status: "CONFLICT",
          errors: "Username already exists",
        });

      if (password !== konfirmasi_password)
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Password and confirmation do not match",
        });

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");

      const tanggal_pembuatan_akun = `${year}-${month}-${date}`;

      // enkripsi password
      const salt = await bcrypt.genSalt();
      const hashingPassword = await bcrypt.hash(password, salt);

      await User.create({
        username,
        password: hashingPassword,
        tanggal_pembuatan_akun,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: {
          username,
          password,
        },
      });
    } catch (error) {
      return res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "Username, Password and password confirmation Fields Are Required",
    });
  }
};

//@description     Login User
//@route           POST /auth/user/register
//@access          Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      // USERNAME TIDAK ADA DI DATABASE
      if (!user)
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "User not found",
        });

      // PASSWORD TIDAK COCOK
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      console.log(password);
      console.log(user.password);

      if (!match)
        return res.status(401).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Incorrect Password",
        });

      const id_user = user.id_user;

      console.log("ini id_user: ", id_user);
      console.log("ini username: ", username);

      const accessToken = jwt.sign({ id_user, username }, accessTokenSecret, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ id_user }, refreshTokenSecret, {
        expiresIn: "1d",
      });

      await User.update(
        { refresh_token: refreshToken },
        {
          where: {
            id_user,
          },
        }
      );

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        // expire in 1 day
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        code: "200",
        status: "OK",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "Username, Password and confirmation Fields Are Required",
    });
  }
};

const logoutUser = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({
      code: "401",
      status: "UNAUTHORIZED",
      errors: "Please Login",
    });
  }
  try {
    const user = await User.findOne({
      where: {
        refresh_token,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: "404",
        status: "NOT_FOUND",
        errors: "User is not found",
      });
    }

    const update = await User.update(
      {
        refresh_token: null,
      },
      {
        where: {
          id_user: user.id_user,
        },
      }
    );

    res.clearCookie("refresh_token");
    return res.status(200).json({
      code: "200",
      status: "OK",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get Token User
//@route           POST /auth/user/token
//@access          Public
const getTokenUser = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token)
      return res.status(401).json({
        code: "401",
        status: "UNAUTHORIZED",
        errors: "No refresh token found in the cookie.",
      });

    const user = await User.findOne({
      where: {
        refresh_token,
      },
    });

    if (!user)
      return res.status(401).json({
        code: "401",
        status: "UNATHORIZED",
        errors: "Refresh Token doesn't match",
      });

    const decoded = jwt.verify(refresh_token, refreshTokenSecret);

    if (!decoded)
      return res.status(401).json({
        code: "401",
        status: "UNATHORIZED",
        errors: "Invalid Refresh Token",
      });

    const id_user = user.id_user;
    const username = user.username;

    const accessToken = jwt.sign({ id_user, username }, accessTokenSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      code: "200",
      status: "OK",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getTokenUser,
};
