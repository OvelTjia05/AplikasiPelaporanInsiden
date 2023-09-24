const Laporan = require("./model");
const User = require("../User/model");
const KajianLaporan = require("../KajianLaporan/model");
const fs = require("fs");
const path = require("path");
const db = require("../../database");
const JenisPasien = require("../JenisPasien/model");

//@description     Get All Laporan User
//@route           GET /api/laporan
//@access          Public
const getAllLaporan = async (req, res, next) => {
  try {
    console.log(req.query.date);
    if (req.query.date) {
      const result = await db.query("SELECT * FROM laporan WHERE DATE(waktu_submit) = ?", {
        replacements: [req.query.date],
        type: QueryTypes.SELECT,
      });

      console.log("ini result...: ", result);

      return res.status(200).json({
        code: "200",
        status: "OK",
        data: result,
      });
    }

    const laporan = await Laporan.findAll({
      attributes: [
        "id_laporan",
        "nama_pasien",
        "no_rekam_medis",
        "ruangan",
        "umur",
        "asuransi",
        "jenis_kelamin_pasien",
        "waktu_mendapatkan_pelayanan",
        "waktu_kejadian_insiden",
        "insiden",
        "kronologis_insiden",
        "insiden_terjadi_pada_pasien",
        "dampak_insiden_terhadap_pasien",
        "probabilitas",
        "orang_pertama_melaporkan_insiden",
        // jenis pasien
        "tempat_insiden",
        "departement_penyebab_insiden",
        "tindak_lanjut_setelah_kejadian_dan_hasil",
        "yang_melakukan_tindak_lanjut_setelah_insiden",
        "kejadian_sama_pernah_terjadi_di_unit_lain",
        "status",
        "tanggal_laporan_dikirim",
        "gambar",
      ],
      include: [
        {
          model: User,
          attributes: ["username", "id_user"],
        },
        {
          model: JenisPasien,
          attributes: ["id_jenis_pasien", "nama_jenis_pasien"],
        },
      ],
    });

    res.status(200).json({
      code: "200",
      status: "OK",
      data: laporan,
    });
  } catch (error) {
    console.log("Ini error: ", error);
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Post laporan By User
//@route           POST /api/laporan/user/:id_user
//@access          Public
const postLaporanByUser = async (req, res) => {
  // const kriteriaWord = ["sakit", "kebakaran", "kecelakaan"];
  // let tingkat_prioritas;

  const user = await User.findOne({
    where: {
      id_user: req.params.id_user,
    },
  });

  if (!user)
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "user id not found",
    });

  let url_gambar = null;

  if (req.file) {
    // return res.status(400).json({
    //   code: "400",
    //   status: "BAD_REQUEST",
    //   errors: "No File Uploaded",
    // });

    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const ext = path.extname(req.file.originalname);

    // const nama_file_gambar = fileName;

    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Invalid Images. Image should be .png .jpg .jpeg",
      });
    }

    if (fileSize > 2097152) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Image must less than 2MB",
      });
    }

    const target = path.join(__dirname, "..", "..", "public/images", fileName);
    fs.renameSync(req.file.path, target);
  }

  const id_user = req.params.id_user;
  const {
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
  } = req.body;

  const status = "laporan masuk";

  if (
    (id_user,
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
    status)
  ) {
    // untuk ambil waktu sekarang
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const witaTime = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Makassar",
      ...options,
    });

    const dateMoUbah = witaTime;
    const tanggal = dateMoUbah.split(", ")[0].split("/");
    const waktu = dateMoUbah.split(", ")[1];

    const tahun = tanggal[2];
    const bulan = tanggal[0];
    const day = tanggal[1];
    const tanggal_laporan_dikirim = `${tahun}-${bulan}-${day}:${waktu}`;

    console.log("ini waktu indonesia tengah: ", tanggal_laporan_dikirim);

    try {
      const laporan = await Laporan.create({
        id_user,
        nama_pasien,
        no_rekam_medis,
        ruangan,
        umur,
        asuransi,
        jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan,
        waktu_kejadian_insiden,
        insiden,
        kronologis_insiden,
        insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien,
        probabilitas,
        orang_pertama_melaporkan_insiden,
        id_jenis_pasien,
        tempat_insiden,
        departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain,
        status,
        tanggal_laporan_dikirim,
        gambar: url_gambar,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: laporan,
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
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "All Fields Are Required",
    });
  }
};

//@description     Post laporan By Anonim
//@route           POST /api/laporan
//@access          Public
const postLaporanByAnonim = async (req, res) => {
  let url_gambar = null;

  if (req.file) {
    const fileName = req.file.originalname;
    const fileSize = req.file.size;
    const ext = path.extname(req.file.originalname);

    // const nama_file_gambar = fileName;

    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Invalid Images. Image should be .png .jpg .jpeg",
      });
    }

    if (fileSize > 2097152) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "public/images", req.file.filename));
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: "Image must less than 2MB",
      });
    }

    const target = path.join(__dirname, "..", "..", "public/images", fileName);
    fs.renameSync(req.file.path, target);
  }

  // const id_user = req.params.id_user;
  const {
    nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
  } = req.body;

  const status = "laporan masuk";

  if (
    (nama_pasien,
    no_rekam_medis,
    ruangan,
    umur,
    asuransi,
    jenis_kelamin_pasien,
    waktu_mendapatkan_pelayanan,
    waktu_kejadian_insiden,
    insiden,
    kronologis_insiden,
    insiden_terjadi_pada_pasien,
    dampak_insiden_terhadap_pasien,
    probabilitas,
    orang_pertama_melaporkan_insiden,
    id_jenis_pasien,
    tempat_insiden,
    departement_penyebab_insiden,
    tindak_lanjut_setelah_kejadian_dan_hasil,
    yang_melakukan_tindak_lanjut_setelah_insiden,
    kejadian_sama_pernah_terjadi_di_unit_lain,
    status)
  ) {
    // untuk ambil waktu sekarang
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const witaTime = date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Makassar",
      ...options,
    });

    const dateMoUbah = witaTime;
    const tanggal = dateMoUbah.split(", ")[0].split("/");
    const waktu = dateMoUbah.split(", ")[1];

    const tahun = tanggal[2];
    const bulan = tanggal[0];
    const day = tanggal[1];
    const tanggal_laporan_dikirim = `${tahun}-${bulan}-${day}:${waktu}`;

    console.log("ini waktu indonesia tengah: ", tanggal_laporan_dikirim);

    try {
      const laporan = await Laporan.create({
        nama_pasien,
        no_rekam_medis,
        ruangan,
        umur,
        asuransi,
        jenis_kelamin_pasien,
        waktu_mendapatkan_pelayanan,
        waktu_kejadian_insiden,
        insiden,
        kronologis_insiden,
        insiden_terjadi_pada_pasien,
        dampak_insiden_terhadap_pasien,
        probabilitas,
        orang_pertama_melaporkan_insiden,
        id_jenis_pasien,
        tempat_insiden,
        departement_penyebab_insiden,
        tindak_lanjut_setelah_kejadian_dan_hasil,
        yang_melakukan_tindak_lanjut_setelah_insiden,
        kejadian_sama_pernah_terjadi_di_unit_lain,
        status,
        tanggal_laporan_dikirim,
        gambar: url_gambar,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: laporan,
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
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "All Fields Are Required",
    });
  }
};

//@description     Update status laporan 'investigasi'
//@route           PATCH /api/laporan/status_laporan/investigasi/:id_laporan
//@access          Public
const updateStatusLaporanInvestigasi = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const id_user = req.id_user;

  console.log("ini id_user: ", id_user);

  try {
    const laporan = await Laporan.update(
      {
        status: "investigasi",
      },
      {
        where: {
          id_laporan,
        },
      }
    );

    await KajianLaporan.create({
      id_laporan,
      id_user,
    });

    await res.status(200).json({
      code: "200",
      status: "OK",
      data: laporan,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Update status laporan 'laporan selesai'
//@route           PATCH /api/laporan/status_laporan/selesai/:id_laporan
//@access          Public
const updateStatusLaporanSelesai = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const { jenis_insiden, grading_risiko_kejadian } = req.body;

  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const witaTime = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Makassar",
    ...options,
  });

  const dateMoUbah = witaTime;
  const tanggal = dateMoUbah.split(", ")[0].split("/");
  const waktu = dateMoUbah.split(", ")[1];

  const tahun = tanggal[2];
  const bulan = tanggal[0];
  const day = tanggal[1];
  const tanggal_laporan_diterima = `${tahun}-${bulan}-${day}:${waktu}`;

  if (jenis_insiden && grading_risiko_kejadian) {
    try {
      await KajianLaporan.update(
        {
          jenis_insiden,
          grading_risiko_kejadian,
          tanggal_laporan_diterima,
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      const laporan = await Laporan.update(
        {
          status: "laporan selesai",
        },
        {
          where: {
            id_laporan,
          },
        }
      );

      res.status(200).json({
        code: "200",
        status: "OK",
        data: laporan,
      });
    } catch (error) {
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "jenis_insiden and grading_risiko_kejadian are required",
    });
  }
};

//@description     Update status laporan 'tolak'
//@route           PATCH /api/laporan/status_laporan/tolak/:id_laporan
//@access          Public
const updateStatusLaporanTolak = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const pesan_dari_admin = req.body.pesan_dari_admin;

  try {
    const laporan = await Laporan.update(
      {
        status_laporan: "tolak",
        pesan_dari_admin,
      },
      {
        where: {
          id_laporan,
        },
      }
    );

    res.status(200).json({
      code: "200",
      status: "OK",
      data: laporan,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get Laporan User By Id User desc order (Latest)
//@route           GET /api/laporan/user/:id_user
//@access          Public
const getLaporanByUserId = async (req, res, next) => {
  try {
    const id_user = req.params.id_user;
    const laporan = await Laporan.findAll({
      attributes: ["id_laporan", "kategori_bidang", "deskripsi", "nama_file_gambar", "url_gambar", "waktu_submit", "status_laporan", "tingkat_prioritas", "pesan_dari_admin"],
      where: {
        id_user,
      },
      order: [["waktu_submit", "DESC"]],
    });

    res.status(200).json({
      code: "200",
      status: "OK",
      data: laporan,
    });
  } catch (error) {
    console.log(error.message);
    req.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

//@description     Get Laporan User By Id User dengan jumlah 3 terbaru
//@route           GET /api/laporan/:id_user
//@access          Public

module.exports = { getAllLaporan, postLaporanByUser, updateStatusLaporanInvestigasi, updateStatusLaporanSelesai, updateStatusLaporanTolak, getLaporanByUserId, postLaporanByAnonim };
