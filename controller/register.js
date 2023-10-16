import { getDb } from '../utils/db.js'

const COL = 'users'

export const register = async (req, res) => {
  const db = await getDb()
  console.log(req.body)
  db.collection(COL).insertOne({ email: req.body.email, password: req.body.password })
  res.end()
}
