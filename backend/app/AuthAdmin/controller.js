const jwt = require("jsonwebtoken");
const Admin = require("../Admin/model");
const bcrypt = require("bcrypt");

const { accessTokenSecret, refreshTokenSecret } = require("../../config");

//@description     Register Admin
//@route           POST /auth/admin/register
//@access          Public
const registerAdmin = async (req, res) => {
  const { username, password, konfirmasi_password } = req.body;

  if (username && password && konfirmasi_password) {
    try {
      const admin = await Admin.findOne({
        where: {
          username,
        },
      });

      if (admin)
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

      await Admin.create({
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
      errors: "Username, Password and confirmation Fields Are Required",
    });
  }
};

//@description     Login Admin
//@route           POST /auth/admin/login
//@access          Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const admin = await Admin.findOne({
        where: {
          username,
        },
      });

      // USERNAME TIDAK ADA DI DATABASE
      if (!admin)
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Admin not found",
        });

      // PASSWORD TIDAK COCOK
      const match = await bcrypt.compare(password, admin.password);

      if (!match)
        return res.status(401).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Incorrect Password",
        });

      const id_admin = admin.id_admin;

      const accessToken = jwt.sign({ id_admin, username }, accessTokenSecret, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ id_admin }, refreshTokenSecret, {
        expiresIn: "1d",
      });

      await Admin.update(
        { refresh_token: refreshToken },
        {
          where: {
            id_admin,
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
      errors: "Username and Password Fields Are Required",
    });
  }
};

const logoutAdmin = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({
      code: "401",
      status: "UNAUTHORIZED",
      errors: "Please Login",
    });
  }
  try {
    const admin = await Admin.findOne({
      where: {
        refresh_token,
      },
    });

    if (!admin) {
      return res.status(404).json({
        code: "404",
        status: "NOT_FOUND",
        errors: "Admin is not found",
      });
    }

    const update = await Admin.update(
      {
        refresh_token: null,
      },
      {
        where: {
          id_admin: admin.id_admin,
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

//@description     Get Token Admin
//@route           POST /auth/admin/token
//@access          Public
const getTokenAdmin = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token)
      return res.status(401).json({
        code: "401",
        status: "UNAUTHORIZED",
        errors: "No refresh token found in the cookie.",
      });

    const admin = await Admin.findOne({
      where: {
        refresh_token,
      },
    });

    if (!admin)
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

    const id_admin = admin.id_admin;
    const username = admin.username;

    const accessToken = jwt.sign({ id_admin, username }, accessTokenSecret, {
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
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getTokenAdmin,
};
