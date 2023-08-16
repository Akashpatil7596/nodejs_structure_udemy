import mongoose, { Schema, Model } from 'mongoose'

import bcrypt from 'bcrypt'

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            select: false,
        },
        confirm_password: {
            type: String,
            select: false,
        },
        profile_picture: {
            type: String,
        },
    },
    {
        collection: 'user-accounts',
    }
)

UserSchema.methods.validatePassword = (password, confirm_password) => {
    if (password == confirm_password) {
        return true
    } else {
        return false
    }
}

// UserSchema.pre('save', async function (next) {
//     console.log('Okay')
//     this.hash = await bcrypt.hash(this.hash, 8)
//     next()
// })

const User = mongoose.model('User', UserSchema)

export default User
