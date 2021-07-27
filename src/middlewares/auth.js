import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { join, resolve } from 'path'

dotenv.config({
  path: join(resolve(), './src/config/.env'),
})

function extractToken(data) {
  const token = data || ''
  return token.replace('Bearer ', '')
}

export default (req, res, next) => {
  const token = extractToken(req.headers.authorization)

  jwt.verify(
    token,
    process.env.JWT_PUBLIC_KEY,
    {
      algorithm: 'RS256',
    },
    (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token invalid' })

      req.userId = decoded.id

      return next()
    }
  )
}
