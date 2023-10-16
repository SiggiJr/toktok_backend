import { getDb } from '../utils/db.js'

const COL = 'users'

export const register = async (req, res) => {
  console.log(req.body)
  const db = await getDb()
  console.log(req.body)
  // db.collection(COL).insertOne({ email: req.body.email, password: req.body.password })
  const user = await db.collection(COL).findOne({ email: req.body.email, password: req.body.password })
  console.log(await user._id)
  res.json(JSON.stringify({ id: user._id }))
}

export const createProfile = async (req, res) => {
  const db = await getDb()
}
