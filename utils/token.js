import jwt from 'jsonwebtoken'

export const createToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

export const verifyToken = token => {
  console.log('Ich versuche zu verifizieren')
  return jwt.verify(token, process.env.JWT_SECRET)
}
