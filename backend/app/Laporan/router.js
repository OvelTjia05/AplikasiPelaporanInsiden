const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllLaporan, postLaporan, updateStatusLaporanSelesai, updateStatusLaporanTindak, updateStatusLaporanTolak } = require("./controller");

const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");

const upload = multer({ dest: "public/images" });

router.get("/laporan", getAllLaporan);
router.post("/laporan/:id_user", upload.single("gambar"), postLaporan);
router.patch("/laporan/status_laporan/tindak/:id_laporan", VerifyTokenAdmin, updateStatusLaporanTindak);
router.patch("/laporan/status_laporan/tolak/:id_laporan", VerifyTokenAdmin, updateStatusLaporanTolak);
router.patch("/laporan/status_laporan/selesai/:id_laporan", VerifyTokenAdmin, updateStatusLaporanSelesai);

module.exports = router;
