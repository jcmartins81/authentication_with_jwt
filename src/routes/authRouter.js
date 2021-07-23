import express from 'express'
import { createUser } from '../services/databaseService.js'
import {authenticate} from '../services/authService.js'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    try {
        const result = await createUser(req.body)
        if(result.error) res.status(400).send({error: result.error })
        res.send({result})
    } catch (error) {
        res.status(400).send({error: 'Registration failed'})
    }
})

authRouter.post('/authenticate', async (req, res) => {
    const { email, password } = req.body
    const result = await authenticate(email, password)
    res.send(result)
})

export default authRouter