import express from "express";
import {createProject, getProjects} from "../services/databaseService.js";

const projectRouter = express.Router()

projectRouter.get('/', async (req, res) => {
    try {
        const result = await getProjects()
        return res.send(result)
    } catch (error) {
        return res.status(400).send({error: 'Error loading projects'})
    }
})

projectRouter.get('/:projectId', async (req, res) => {

})

projectRouter.post('/', async (req, res) => {
    try {
        const result = await createProject(req.body)

        if(result.error) return res.status(400).send({error: result.error})

        return res.send(result)
    } catch (error) {
        return res.status(400).send({error: 'Error creating a new project'})
    }
})

projectRouter.put('/:projectId', async(req, res) => {
    res.send({user: req.userId})
})

projectRouter.delete('/:projectId', async (req, res) =>{
    res.send({user: req.userId})
})

export default projectRouter