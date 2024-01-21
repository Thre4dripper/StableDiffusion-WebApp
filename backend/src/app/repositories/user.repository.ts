import User from '../models/user.model'

class UserRepository {
    async find(filter: {}) {
        return User.findOne(filter).exec()
    }

    async create(data: any) {
        return User.create(data)
    }

    async update(filter: {}, data: any) {
        return User.updateOne(filter, data).exec()
    }
}

export default new UserRepository()
