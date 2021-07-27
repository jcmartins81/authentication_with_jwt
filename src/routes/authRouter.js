import express from 'express'
import { createUser } from '../services/databaseService.js'
import {
  authenticate,
  forgotPassword,
  resetPassword,
} from '../services/authService.js'
import auth from '../middlewares/auth.js'

const authRouter = express.Router()

authRouter.post('/register', auth, async (req, res) => {
  try {
    const result = await createUser(req.body, req.userId)
    if (result.error) return res.status(400).send({ error: result.error })
    res.send({ result })
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

authRouter.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const result = await authenticate(email, password)
  res.send(result)
})

authRouter.post('/forgot_password', async (req, res) => {
  try {
    const { email } = req.body
    const result = await forgotPassword(email)
    if (result.error) return res.status(400).send(result.error)
    return res.send(result.message)
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again!' })
  }
})

authRouter.post('/reset_password', async (req, res) => {
  try {
    const { email, token, password } = req.body
    const result = await resetPassword(email, token, password)
    if (result.error) return res.status(400).send(result.error)
    res.send(result.message)
  } catch (error) {
    return res.status(400).send({ error: 'Cannot reset password try again!' })
  }
})
export default authRouter
