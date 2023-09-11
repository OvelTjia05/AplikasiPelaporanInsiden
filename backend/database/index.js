const { Sequelize } = require("sequelize");

const db = new Sequelize("pelaporan_insiden", "root", "", {
  host: "localhost",
  port: 3307,
  dialect: "mariadb",
  timezone: "Asia/Makassar",
});

db.authenticate()
  .then(() => console.log("Koneksi berhasil"))
  .catch((error) => console.log("Unable to connect to the database : ", error));

module.exports = db;
