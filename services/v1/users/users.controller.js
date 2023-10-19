import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './users.model.js'
import Detail from '../../../config/class.js'

export const createUser = async (req, res, next) => {
    try {
        req.body.email = req.body.email.toLowerCase()

        const isExist = await User.findOne({ email: req.body.email }).lean()

        if (isExist) {
            return res.status(404).json({
                success: false,
                message: 'Email already registered try with different one',
            })
        }

        req.body.password = await bcrypt.hash(req.body.password, 8)

        const profile_picture = req.files.image.map((e) => e.filename)

        req.body.profile_picture = profile_picture

        const storeUser = new User(req.body).save()

        return res.status(200).json({
            success: true,
            data: storeUser,
            message: 'Register successfully',
        })
    } catch (error) {
        console.log('error', error)
        next(error)
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

    const response = new Detail(login)

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
