const express = require("express");
const router = express.Router();
const { getAllUser, getUserById } = require("./controller");
const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");
const VerifyTokenUser = require("../../middleware/VerifyTokenUser");

router.get("/users", getAllUser);
router.get("/user/:id_user", getUserById);

module.exports = router;
