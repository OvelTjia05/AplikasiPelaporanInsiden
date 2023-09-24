const express = require("express");
const router = express.Router();
const { getAllJenisPasien, postJenisPasien } = require("./controller");

router.get("/jenis_pasien", getAllJenisPasien);
router.post("/jenis_pasien", postJenisPasien);

module.exports = router;
