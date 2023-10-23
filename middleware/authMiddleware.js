import { verifyToken } from '../utils/token.js'

export const checkToken = (req, res, next) => {
  const token = req.cookies.token
  console.log(token)
  if (token === 'null') return res.status(403).end()
  try {
    const payload = verifyToken(token)
    console.log(payload)
    req.payload = payload
    next()
  } catch (err) {
    res.status(403).end()
  }
}
