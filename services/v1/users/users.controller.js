import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import moment from "moment";
import { generate } from "otp-generator";
import UserServices from "./users.services.js";
import Detail from "../../../config/class.js";
import { uploadFile } from "../../../helper/file-upload.js";
import sendMail from "../../../helper/aws-email.js";
import CommonFunctions from "../../../helper/commonFunctions.js";
import { VERIFICATION_STATUS } from "../../../helper/constants.js";

class UsersController {
    async createUser(req, res) {
        try {
            req.body.email = req.body.email.toLowerCase();

            const isExist = await UserServices.getOne({ email: req.body.email });

            if (isExist) {
                return res.status(404).json({
                    success: false,
                    message: "Email already registered try with different one",
                });
            }

            if (req?.files?.image) {
                req.body.profile_picture = uploadFile("users", req.files.image);
            }

            req.body.otp = generate(4, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true,
            });

            req.body.otp_expiration_time = moment().add(5, "minutes");

            req.body.password = await bcrypt.hash(req.body.password, 8);

            req.body.verification_status = VERIFICATION_STATUS.PENDING;

            const storeUser = await UserServices.store(req.body);

            if (!storeUser) {
                return res.status(400).json({
                    success: false,
                    message: "Server error",
                });
            }

            if (storeUser) {
                const emailData = {
                    from: process.env.SENDER_MAIL,
                    to: storeUser.email,
                    template: "Verification-mail",
                    templateData: {
                        name: storeUser.username,
                        otp: storeUser.otp,
                    },
                };

                await sendMail(emailData);
            }

            const apiResonse = new Detail(storeUser);

            return res.status(200).json({
                success: true,
                data: apiResonse,
                message: "Register successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
            });
        }
    }

    async verifyUser(req, res) {
        try {
            const { userId, otp } = req.body;

            const user = await UserServices.getOne({ _id: userId });

            const isOtpExpired = new Date(moment().toISOString()) > new Date(moment(user.otp_expiration_time.toISOString()));

            if (isOtpExpired) {
                return res.status(400).json({
                    success: false,
                    message: "Otp provided by you is not expired, try registering process again.",
                });
            }

            const verifyOtp = await CommonFunctions.matchString(otp, user.otp);

            if (!verifyOtp) {
                return res.status(404).json({
                    success: false,
                    message: "Otp provided by you is not valid.",
                });
            }

            const updateUser = await UserServices.updateOne({ _id: userId }, { verification_status: VERIFICATION_STATUS.VERIFIED });

            const apiResonse = new Detail(updateUser);

            return res.status(200).json({
                success: true,
                data: apiResonse,
                message: "User verified successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error,
            });
        }
    }
}

export default UsersController;
