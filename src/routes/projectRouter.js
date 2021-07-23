import express from "express";

const projectRouter = express.Router()

projectRouter.get('/', (req, res) => {
    res.send({ok: true, id: req.userId})
})

export default projectRouter