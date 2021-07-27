import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { join, resolve } from 'path'

dotenv.config({
  path: join(resolve(), './src/config/.env'),
})

export default (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  const parts = authHeader.split(' ')
  if (!parts.length === 2) return res.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformed' })

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' })

    req.userId = decoded.id

    return next()
  })
}
