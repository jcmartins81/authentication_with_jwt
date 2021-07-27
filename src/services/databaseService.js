import User from '../database/models/user.js'
import Project from '../database/models/project.js'
import Task from '../database/models/task.js'

export async function createUser(user) {
  try {
    if (await User.findOne({ email: user.email }))
      return { error: 'User already exists!' }
    const newUser = await User.create(user)
    newUser.password = ''
    return newUser
  } catch (error) {
    return error
  }
}

export async function findUSer(email) {
  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) return { error: 'User not found!' }
    return user
  } catch (error) {
    return error
  }
}

export async function findUSerWithResetToken(email) {
  try {
    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires'
    )
    if (!user) return { error: 'User not found!' }
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
        passwordResetExpires: now,
      },
    })
  } catch (err) {
    return err
  }
}

export async function updateUserIfNewPassword(id, password) {
  try {
    const user = await User.findOne({ _id: id }).select('+password')
    if (!user) return { error: 'User not found!' }
    user.password = password
    await user.save()
    return { message: 'Password updated' }
  } catch (err) {
    return err
  }
}

async function addTasksToProject(project, tasks) {
  await Promise.all(
    tasks.map(async (task) => {
      const projectTask = new Task({ ...task, project: project._id })
      await projectTask.save()
      project.tasks.push(projectTask)
    })
  )
  await project.save()

  return project
}

export async function createProject(data) {
  try {
    const { title, description, tasks, user } = data
    const project = await Project.create({ title, description, user })
    if (!project) return { error: 'Error creating project' }

    return await addTasksToProject(project, tasks)
  } catch (error) {
    return { error }
  }
}

export async function getProjects() {
  try {
    return await Project.find().populate(['user', 'tasks'])
  } catch (error) {
    return { error: 'Error loading projects' }
  }
}

export async function getProject(id) {
  try {
    return await Project.findById(id).populate(['user', 'tasks'])
  } catch (error) {
    return { error: 'Project not found!' }
  }
}

export async function updateProject(data) {
  try {
    const { id, title, description, tasks } = data
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    )

    if (!project) return { error: 'Error creating project' }

    project.tasks = []

    await Task.remove({ project: project._id })

    return await addTasksToProject(project, tasks)
  } catch (error) {
    return { error: 'Not update project' }
  }
}

export async function removeProject(id) {
  try {
    return await Project.findByIdAndDelete(id)
  } catch (error) {
    return { error }
  }
}
