import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './users.model.js'
import Detail from '../../../config/class.js'

export const createUser = async (req, res, next) => {
    try {
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
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { email } = req.body
    const login = await User.findOne({
        email: req.body.email,
    })

    const response = new Detail(login)
    console.log('response', response)
    // const checkPassword = await bcrypt.compare('67891', login.password)
    // console.log(checkPassword)
    // if (checkPassword) {
    // const jwtu = await jwt.sign({ data: 'foobar' }, 'secret', {
    //     expiresIn: '1d',
    // })
    // console.log('jwt', jwtu)

    // const jwyVerify = await jwt.verify(jwtu, 'secret')
    // console.log('jwyVerify', jwyVerify)
    // // }
}
