const { DataTypes } = require("sequelize");
const db = require("../../database");

const User = db.define(
  "user",
  {
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_pembuatan_akun: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
