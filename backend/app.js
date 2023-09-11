var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var laporan = require("./app/Laporan/router");
var user = require("./app/user/router");
var authUser = require("./app/AuthUser/router");
var authAdmin = require("./app/AuthAdmin/router");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// atur cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

app.use("/api", laporan);
app.use("/api", user);

app.use("/auth", authUser);
app.use("/auth", authAdmin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
