const Laporan = require("./model");
const User = require("../User/model");
const fs = require("fs");
const path = require("path");

//@description     Get All Laporan User
//@route           GET /api/laporan
//@access          Public
const getAllLaporan = async (req, res, next) => {
  try {
    const laporan = await Laporan.findAll({
      attributes: ["id_laporan", "kategori_bidang", "deskripsi", "nama_file_gambar", "url_gambar", "waktu_submit", "status_laporan", "tingkat_prioritas", "pesan_dari_admin"],
      include: [
        {
          model: User,
          attributes: ["username", "id_user"],
        },
      ],
    });

    res.json({
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

//@description     Post laporan
//@route           POST /api/laporan
//@access          Public
const postLaporan = async (req, res) => {
  const kriteriaWord = ["sakit", "kebakaran", "kecelakaan"];
  let tingkat_prioritas;

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

  if (req.file === undefined)
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "No File Uploaded",
    });

  const fileName = req.file.originalname;
  const fileSize = req.file.size;
  const ext = path.extname(req.file.originalname);

  const id_user = req.params.id_user;
  const { kategori_bidang, deskripsi, status_laporan } = req.body;
  const nama_file_gambar = fileName;

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
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

  // analisis teks yang dimasukkan
  const wordsArray = deskripsi.match(/\b\w+\b/g).map((word) => word.toLowerCase());
  const kataDitemukan = wordsArray.filter((word) => kriteriaWord.includes(word));

  if (kataDitemukan.length > 0) {
    tingkat_prioritas = "darurat";
  } else {
    tingkat_prioritas = "normal";
  }

  if ((kategori_bidang, deskripsi, url_gambar)) {
    try {
      const laporan = await Laporan.create({
        id_user,
        kategori_bidang,
        deskripsi,
        nama_file_gambar,
        url_gambar,
        status_laporan,
        tingkat_prioritas,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
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
      errors: "All Fields Are Required",
    });
  }
};

//@description     Update status laporan 'selesai'
//@route           PATCH /api/laporan/status_laporan/selesai/:id_laporan
//@access          Public
const updateStatusLaporanSelesai = async (req, res) => {
  const id_laporan = req.params.id_laporan;
  const pesan_dari_admin = req.body.pesan_dari_admin;

  try {
    const laporan = await Laporan.update(
      {
        status_laporan: "selesai",
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

//@description     Update status laporan 'tindak'
//@route           PATCH /api/laporan/status_laporan/tindak/:id_laporan
//@access          Public
const updateStatusLaporanTindak = async (req, res) => {
  const id_laporan = req.params.id_laporan;

  try {
    const laporan = await Laporan.update(
      {
        status_laporan: "tindak",
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

module.exports = { getAllLaporan, postLaporan, updateStatusLaporanSelesai, updateStatusLaporanTindak, updateStatusLaporanTolak };
