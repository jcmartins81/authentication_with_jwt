import User from "../database/models/user.js";

export async function createUser(user) {
  try {
    if(await User.findOne({email: user.email})) return ({error: 'User already exists!'})
    const newUser = await User.create(user);
    newUser.password = "";
    return newUser;
  } catch (error) {
    return error;
  }
}

export async function findUSer(email) {
  try {
    const user = await User.findOne({email}).select('+password')
    if(!user) return {error: 'User not found!'}
    return user
  } catch (error) {
    return error
  }
}
