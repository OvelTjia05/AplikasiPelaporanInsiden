const { Sequelize } = require("sequelize");
const { dbName, dbUsername, dbPassword, dbHostname } = require("../config/index.js");

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHostname,
  port: 3307,
  dialect: "mariadb",
  // timezone: "Asia/Makassar",
});

db.authenticate()
  .then(() => console.log("Koneksi berhasil"))
  .catch((error) => console.log("Unable to connect to the database : ", error));

module.exports = db;
