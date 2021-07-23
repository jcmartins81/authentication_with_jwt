import {findUSer} from './databaseService.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import {resolve, join} from 'path'
import {generateToken} from "../utils/token.js";

dotenv.config({
    path: join(resolve(), './src/config/.env')
})

export async function authenticate(email, password) {
    try {
        const user = await findUSer(email)

        if(user.error) return ({ error: user.error })

        if(!await bcrypt.compare(password, user.password)) return ({error: 'Invalid password'})

        user.password = ''

        return ({user, token: await generateToken({id: user.id})})
    } catch (error) {
        return error
    }


}