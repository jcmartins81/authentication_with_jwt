import User from '../database/models/user.js'

export async function createUser(user) {
    try {
        const newUser = await User.create(user)
        return newUser;
    } catch (error) {
        return error;
    }
}