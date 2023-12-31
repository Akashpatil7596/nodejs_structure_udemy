const mongoose = require("mongoose");
let softDelete = require("mongoosejs-soft-delete");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: false,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
            default: "",
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            required: false,
        },
        otp: {
            type: Number,
            required: false,
            default: 0,
        },
        otp_exoiration_time: {
            type: Date,
            required: false,
        },
        fcm_token: {
            type: String,
            required: false,
            default: "",
        },
        device_type: {
            type: String,
            enum: ["android", "ios"],
            default: "android",
            required: false,
        },
        device_id: {
            type: String,
            required: false,
            default: "",
        },
        status: {
            type: String,
            enum: ["verified", "pending", "deactivated"],
            default: "pending",
            required: false,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

usersSchema.plugin(softDelete);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
