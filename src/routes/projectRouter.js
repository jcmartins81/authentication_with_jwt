import express from 'express'
import {
  createProject,
  getProject,
  getProjects,
  removeProject,
  updateProject,
} from '../services/databaseService.js'

const projectRouter = express.Router()

projectRouter.get('/', async (req, res) => {
  try {
    const result = await getProjects()
    return res.send(result)
  } catch (error) {
    return res.status(400).send({ error: 'Error loading projects' })
  }
})

projectRouter.get('/:projectId', async (req, res) => {
  try {
    const result = await getProject(req.params.projectId)
    if (result.error) return new Error()
    return res.send(result)
  } catch (error) {
    return res.status(400).send({ error: 'Project not found' })
  }
})

projectRouter.post('/', async (req, res) => {
  try {
    const result = await createProject({ ...req.body, user: req.userId })

    if (result.error) return res.status(400).send({ error: result.error })

    return res.send(result)
  } catch (error) {
    return res.status(400).send({ error: 'Error creating a new project' })
  }
})

projectRouter.put('/:projectId', async (req, res) => {
  try {
    const { title, description, tasks } = req.body
    const result = await updateProject({
      ...req.body,
      id: req.params.projectId,
    })

    if (result.error) return res.status(400).send({ error: result.error })

    return res.send(result)
  } catch (error) {
    return res.status(400).send({ error })
  }
})

projectRouter.delete('/:projectId', async (req, res) => {
  try {
    const result = await removeProject(req.params.projectId)
    if (result.error) return new Error()
    return res.send()
  } catch (error) {
    return res.status(400).send({ error: 'Error deleting project' })
  }
})

export default projectRouter
