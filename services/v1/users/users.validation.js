const Joi = require('joi')
const {
    commonResponse,
    commonFunctions,
    nodemailer,
    fileupload,
    s3Client,
} = require('../../helper')

module.exports = {
    registerValidation: async (req, res, next) => {
        try {
            const UserSchema = Joi.object().keys({
                email: Joi.string().lowercase().required().email(),
                password: Joi.string().required(),
                confirm_password: Joi.any()
                    .valid(Joi.ref('password'))
                    .required(),
                image: Joi.any(),
            })

            const result = UserSchema.validate(req.body)

            if (result.hasOwnProperty('error')) {
                return commonResponse.sendJoiError(
                    res,
                    'REQUIRED_FIELD_VALIDATION',
                    result.error
                )
            } else {
                next()
            }
        } catch (error) {
            logger.error(
                '🚀 ~ file: users.validation.js:28 ~ createUserValidation: ~ error:',
                error
            )
            return error
        }
    },
}
