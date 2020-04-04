var express = require("express");
var path = require("path");
const fs = require("fs");
var logger = require("morgan");
var bodyParser = require("body-parser");
var useragent = require("express-useragent");

var { models } = require("./models");
const index = require("./routes/index");

const grafikApp = express();

grafikApp.use(bodyParser.urlencoded({ extended: true }));
grafikApp.use(bodyParser.json());

grafikApp.use(logger("dev"));
grafikApp.use(useragent.express());

grafikApp.use(express.static("public"));

// // catch 404 and forward to error handler
// grafikApp.use(function(req, res, next) {
//     var err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// error handler
grafikApp.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
});

grafikApp.use("/", index);

grafikApp.get("/", function(req, res, next) {
    res.sendFile(`${__dirname}/views/index.html`);
});

// grafikApp.post("/addDream", (req, res) => {
//     console.log(`add to dreams ${req.body.dream}`);
// });

module.exports = grafikApp;