import * as Joi from 'joi'

const registerValidation = async (req, res, next) => {
    try {
        const UserSchema = Joi.object().keys({
            email: Joi.string().lowercase().required().email(),
            password: Joi.string().required(),
            confirm_password: Joi.any().valid(Joi.ref('password')).required(),
            image: Joi.any(),
        })

        const result = UserSchema.validate(req.body)

        if (result.hasOwnProperty('error')) {
            res.json({ error: result.error })
        } else {
            next()
        }
    } catch (error) {
        return error
    }
}

export default registerValidation
