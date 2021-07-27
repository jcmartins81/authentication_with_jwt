import { join, resolve } from 'path'
import dotenv from 'dotenv'
import database from '../index.js'

dotenv.config({
  path: join(resolve(), './src/config/.env'),
})

const taskSchema = new database.Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: database.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: {
    type: database.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Task = database.model('Task', taskSchema)

export default Task
