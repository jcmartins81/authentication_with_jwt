import User from "../database/models/user.js";
import Project from '../database/models/project.js'

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
    console.log(user)
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
    const user = await User.findOne({_id: id}).select('+password')
    if(!user) return {error: 'User not found!'}
    user.password = password
    await user.save()
    return {message: 'Password updated'}
  } catch (err) {
    return err
  }
}

export async function createProject(data) {
  try {
    const project = await Project.create(data)
    if(!project) return {error: 'Error creating project'}

    return project
  } catch (error) {
    return {error}
  }
}

export async function getProjects() {
  try {
    const projects = await Project.find()

    return projects
  } catch (error) {
    return {error: 'Error loading projects'}
  }
}
