import Joi from 'joi'

const registerValidation = async (req, res, next) => {
    try {
        const UserSchema = Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().lowercase().required().email(),
            password: Joi.string().required(),
            confirm_password: Joi.any().valid(Joi.ref('password')).required(),
            image: Joi.any(),
        })

        const result = UserSchema.validate(req.body)

        if (result.hasOwnProperty('error')) {
            return res.json({ error: result.error.details[0].message })
        } else {
            next()
        }
    } catch (error) {
        return error
    }
}

export default registerValidation
