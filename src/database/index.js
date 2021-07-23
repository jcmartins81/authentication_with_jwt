import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve('../config/.env')
})

mongoose.connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_ADDRESS}:27017/${process.env.MONGO_DATABASE}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    }
)
.then(() => console.log('Conectado ao DB'))
.catch((err) => {
    console.log(err, 'Não foi possível conectar no DB')
})
mongoose.Promise = global.Promise

export default mongoose