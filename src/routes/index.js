import express from 'express'
import authRouter from './authRouter.js'
import projectRouter from './projectRouter.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/projects', auth, projectRouter)

export default router
