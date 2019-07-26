"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1.config();
console.log(dotenv_1.config());
var envar = process.env;
exports.configuration = Object.freeze({
    port: envar.PORT
});
