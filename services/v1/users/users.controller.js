import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './users.model.js'
import Detail from '../../../config/class.js'

export const createUser = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const { password, confirm_password } = req.body

        req.body.password = await bcrypt.hash(req.body.password, 8)

        const profile_picture = req.files.image.map((e) => e.filename)

        const user = await new User({
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            profile_picture: profile_picture.toString(),
        })

        user.validatePassword(password, confirm_password)

        user.save()

        res.status(200).json(user)
    } catch (error) {
        console.log('error',error)
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { email, confirm_email } = req.body

    const login = await User.findOne(
        {
            email,
        },
        {
            email: 1,
            password: 1,
        }
    )

    const response = new Detail(login)

    const checkPassword = await bcrypt.compare(confirm_email, login.password)

    if (checkPassword) {
        const generateToken = await jwt.sign({ id: login._id }, 'secret', {
            expiresIn: '30d',
        })

        // const tokenVerify = await jwt.verify(generateToken, 'secret')

        response.token = generateToken

        res.status(200).json(response)
    }
}
