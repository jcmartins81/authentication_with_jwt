import express from "express";
import Project from "../database/models/project.js";
import Task from "../database/models/task.js";

const projectRouter = express.Router()

projectRouter.get('/', (req, res) => {
    res.send({ok: true, id: req.userId})
})

export default projectRouter