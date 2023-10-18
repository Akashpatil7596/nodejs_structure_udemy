const commonResponse = require("./commonResponse");
const commonFunctions = require("./functions");
const nodemailer = require("./nodemailer");
const mongodb = require("./mongodb");
const passport = require("./passport");
const multerSetting = require("./multer");
const common = require("./common");
const guard = require("./guards");
const fileupload = require("./file-upload");
const s3Client = require("./s3-client");

module.exports = {
    commonResponse,
    commonFunctions,
    guard,
    nodemailer,
    mongodb,
    passport,
    multerSetting,
    common,
    fileupload,
    s3Client,
};
