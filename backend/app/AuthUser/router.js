const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("./controller");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.delete("/user/logout", logoutUser);

module.exports = router;
