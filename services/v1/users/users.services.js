import User from './users.model.js'

class UserServices {
    static async store(reqData) {
        try {
            return await new User(reqData).save()
        } catch (error) {
            return error
        }
    }

    static async getOne(query, selectedData) {
        try {
            return await User.findOne(query, selectedData).lean()
        } catch (error) {
            return error
        }
    }
}

export default UserServices
