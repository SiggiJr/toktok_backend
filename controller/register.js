import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

const COL = 'users'

export const register = async (req, res) => {
  console.log(req.body)
  const db = await getDb()
  console.log(req.body)
  await db.collection(COL).insertOne({ email: req.body.email, password: req.body.password })
  const user = await db.collection(COL).findOne({ email: req.body.email, password: req.body.password })
  // console.log(user._id)
  res.json(JSON.stringify({ id: user._id }))
}

export const createProfile = async (req, res) => {
  const data = req.body
  const db = await getDb()
  db.collection(COL).updateOne(
    { _id: new ObjectId(data.id) },
    {
      $set: { ...data },
    },
  )
  db.collection(COL).updateOne(
    { _id: new ObjectId(data.id) },
    {
      $unset: { id: 1 },
    },
  )
  res.end()
}
