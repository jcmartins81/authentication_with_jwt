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

export async function findUSerWithResetToken(email) {
  try {
    const user = await User.findOne({email}).select('+passwordResetToken passwordResetExpires')
    if(!user) return {error: 'User not found!'}
    return user
  } catch (error) {
    return error
  }
}

export async function updateUserIfResetToken(id, token, now) {
  try {
    return await User.findByIdAndUpdate(id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    })
  } catch (err) {
    return err
  }
}

export async function updateUserIfNewPassword(id, password) {
  try {
    const {user} = User.findOne(id)
    user.password = password
    console.log(user)
    return await user.save()
  } catch (err) {
    return err
  }
}
