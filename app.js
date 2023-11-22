import express from "express";

import "dotenv/config";

import bodyParser from "body-parser";

import fileUpload from "express-fileupload";

import mongo_connection from "./config/database.js";

import routes from "./routes/v1/index.js";

import mailTemplates from "./helper/email-templates.js";

<<<<<<< HEAD
import uploadMailTOAWS from "./helper/email-services.js";

const app = express();

const port = process.env.PORT || 80;
=======
const port = 8001
>>>>>>> b77d4d1e93752c2e9502b1d81c0f3d30001bbf63

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse formData
app.use(fileUpload({ parseNested: true }));

await mongo_connection(process.env.MONGO_URI || "mongodb+srv://root:root@cluster0.u6ctlke.mongodb.net/aws-project?retryWrites=true&w=majority");

// Load aws email templates
for (const mail of mailTemplates) {
    await uploadMailTOAWS(mail);
}

// routes
app.use("/api", routes);

// unhandled routes
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: `Can't find ${req.originalUrl} on this server`,
    });
});

app.use((err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
    });
});

app.listen(port, () => {
    console.log(`connected on port ${port}`);
});
