import jwt from 'jsonwebtoken'

export default function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_PRIVATE_KEY, {
    expiresIn: '15m',
    algorithm: 'RS256',
  })
}
