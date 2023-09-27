const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getAllLaporan,
  getLaporanByIdLaporan,
  getLaporanByUserId,
  getLatestThreeLaporanByUserId,
  getLaporanToday,
  getLaporanCurrentMonth,
  getLaporanAmount,
  postLaporanByUser,
  postLaporanByAnonim,
  updateStatusLaporanInvestigasi,
  updateStatusLaporanSelesai,
  updateStatusLaporanTolak,
} = require("./controller");

const VerifyTokenAdmin = require("../../middleware/VerifyTokenAdmin");

const upload = multer({ dest: "public/images" });

router.get("/laporan", getAllLaporan);
router.get("/laporan/current/day", getLaporanToday);
router.get("/laporan/current/month", getLaporanCurrentMonth);
router.get("/laporan/amount", getLaporanAmount);

router.get("/laporan/:id_laporan", getLaporanByIdLaporan);
router.get("/laporan/user/:id_user", getLaporanByUserId);
router.get("/laporan/user/latest/:id_user", getLatestThreeLaporanByUserId);

router.post("/laporan/user/:id_user", upload.single("gambar"), postLaporanByUser);
router.post("/laporan", upload.single("gambar"), postLaporanByAnonim);

router.patch("/laporan/status_laporan/investigasi/:id_laporan", VerifyTokenAdmin, updateStatusLaporanInvestigasi);
router.patch("/laporan/status_laporan/selesai/:id_laporan", VerifyTokenAdmin, updateStatusLaporanSelesai);
router.patch("/laporan/status_laporan/tolak/:id_laporan", VerifyTokenAdmin, updateStatusLaporanTolak);

module.exports = router;
