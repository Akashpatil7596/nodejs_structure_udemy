const mongoose = require("mongoose");

exports.mongo_connection = () => {
    mongoose.set("debug", true);
    try {
        mongoose.connect(
            process.env.DB_MONGO_URL || "mongodb+srv://root:root@cluster0.u6ctlke.mongodb.net/aws-project?retryWrites=true&w=majority",
            { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true },
            function (err, db) {
                if (err) {
                    console.log("MongoDB Database Connection Error", err);
                } else {
                    console.log("MongoDB Connection Done!!");
                }
            }
        );
    } catch (e) {
        console.log("MongoDB Connection Error");
    }
};
