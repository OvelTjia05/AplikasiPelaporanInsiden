const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getTokenUser } = require("./controller");

router.get("/user/token", getTokenUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.delete("/user/logout", logoutUser);

module.exports = router;
