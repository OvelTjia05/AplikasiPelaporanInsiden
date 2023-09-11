const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin, logoutAdmin, getTokenAdmin } = require("./controller");

router.get("/admin/token", getTokenAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/register", registerAdmin);
router.delete("/admin/logout", logoutAdmin);

module.exports = router;
