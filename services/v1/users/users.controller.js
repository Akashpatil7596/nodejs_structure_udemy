import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import moment from 'moment'
import { generate } from 'otp-generator'
import UserServices from './users.services.js'
import Detail from '../../../config/class.js'
import { uploadFile } from '../../../helper/file-upload.js'

export const createUser = async (req, res, next) => {
    try {
        req.body.email = req.body.email.toLowerCase()

        const isExist = await UserServices.getOne({ email: req.body.email })

        if (isExist) {
            return res.status(404).json({
                success: false,
                message: 'Email already registered try with different one',
            })
        }

        if (req?.files?.image) {
            req.body.profile_picture = uploadFile('users', req.files.image)
        }

        req.body.otp = generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true,
        })

        req.body.otp_expiration_time = moment().add(5, 'minutes')

        req.body.password = await bcrypt.hash(req.body.password, 8)

        const storeUser = await UserServices.store(req.body)

        const apiResonse = new Detail(storeUser)

        return res.status(200).json({
            success: true,
            data: apiResonse,
            message: 'Register successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        })
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body

    const login = await User.findOne(
        {
            email: email,
        },
        {
            email: 1,
            password: 1,
        }
    )

    const checkPassword = await bcrypt.compare(password, login.password)

    if (!checkPassword) {
        return res.status(404).json({
            success: false,
            message: 'Passwords does not match',
        })
    }
    const generateToken = await jwt.sign(
        {
            id: login._id,
        },
        process.env.JWT_SECRET || 'secretkey',
        {
            expiresIn: '30d',
        }
    )

    response.token = generateToken

    res.status(200).json(response)
}
