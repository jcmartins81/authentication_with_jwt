import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { join, resolve } from 'path'
import crypto from 'crypto'
import { generateToken } from '../utils/token.js'
import {
  findUSer,
  findUSerWithResetToken,
  updateUserIfNewPassword,
  updateUserIfResetToken,
} from './databaseService.js'
import transport from './mailerService.js'

dotenv.config({
  path: join(resolve(), './src/config/.env'),
})

export async function authenticate(email, password) {
  try {
    const user = await findUSer(email)

    if (user.error) return { error: user.error }

    if (!(await bcrypt.compare(password, user.password)))
      return { error: 'Invalid password' }

    user.password = ''

    return { user, token: await generateToken({ id: user.id }) }
  } catch (error) {
    return error
  }
}

export async function forgotPassword(email) {
  const user = await findUSer(email)
  if (!user) return { error: 'User not Found!' }

  const token = crypto.randomBytes(20).toString('hex')
  const now = new Date()
  now.setHours(now.getHours() + 1)

  if (!(await updateUserIfResetToken(user.id, token, now)))
    return { error: 'Error on forgot password, try again' }

  await transport.sendMail(
    {
      from: 'jcmartins81@outlook.com',
      to: email,
      subject: 'Forgot Password?',
      template: 'auth/forgot_password',
      context: { token },
    },
    (err) => ({ error: 'Cannot send forgot password email' })
  )

  return {
    message: 'Email enviado com sucesso! Verifique sua caixa de entrada!',
  }
}

export async function resetPassword(email, token, password) {
  try {
    const user = await findUSerWithResetToken(email)

    if (user.error) return { error: 'User not Found!' }

    if (token !== user.passwordResetToken) return { error: 'Token invalid' }

    const now = new Date()
    if (now > user.passwordResetExpires)
      return { error: 'Token expired, try again' }

    return await updateUserIfNewPassword(user.id, password)
  } catch (error) {
    return { error }
  }
}
