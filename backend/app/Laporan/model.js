const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../database");
const User = require("../User/model");

const Laporan = db.define(
  "Laporan",
  {
    id_laporan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    kategori_bidang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nama_file_gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_gambar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    waktu_submit: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    status_laporan: {
      type: DataTypes.STRING,
      allowNull: false,

      defaultValue: "antrian",
      validate: {
        isIn: [["antrian", "tindak", "tolak", "selesai"]],
      },
    },
    tingkat_prioritas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesan_dari_admin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Laporan, {
  foreignKey: "id_user",
});
Laporan.belongsTo(User, {
  foreignKey: "id_user",
});

module.exports = Laporan;
