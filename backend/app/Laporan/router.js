const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllLaporan, postLaporanByUser, updateStatusLaporanInvestigasi, updateStatusLaporanSelesai, updateStatusLaporanTolak, getLaporanByUserId, postLaporanByAnonim } = require("./controller");

const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");

const upload = multer({ dest: "public/images" });

router.get("/laporan", getAllLaporan);
router.get("/laporan/user/:id_user", getLaporanByUserId);
router.post("/laporan//user/:id_user", upload.single("gambar"), postLaporanByUser);
router.post("/laporan", upload.single("gambar"), postLaporanByAnonim);

router.patch("/laporan/status_laporan/tolak/:id_laporan", updateStatusLaporanTolak);
router.patch("/laporan/status_laporan/investigasi/:id_laporan", VerifyTokenAdmin, updateStatusLaporanInvestigasi);
router.patch("/laporan/status_laporan/selesai/:id_laporan", VerifyTokenAdmin, updateStatusLaporanSelesai);

module.exports = router;
