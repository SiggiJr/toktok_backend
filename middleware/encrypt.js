import { createHmac } from 'crypto'

export const encrypt = (req, res, next) => {
  const hmac = createHmac('sha256', req.body.password)
  req.body.password = hmac.digest('hex')
  next()
}
