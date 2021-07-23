import express from 'express'
import { createUser } from '../services/databaseService.js'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    try {
        const user = await createUser(req.body)
        res.send({user})
    } catch (error) {
        res.status(400).send({error: 'Registration failed'})
    }
})

export default authRouter