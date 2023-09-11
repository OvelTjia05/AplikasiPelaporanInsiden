const express = require("express");
const router = express.Router();
const { getAllUser } = require("./controller");
const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");

router.get("/users", VerifyTokenAdmin, getAllUser);

module.exports = router;
