import express from 'express'
import cors from 'cors'
import router from './routes/index.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world')
})

export default app