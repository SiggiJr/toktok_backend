import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

const COL = 'posts'

export const getUserFeed = async (req, res) => {
  const userId = req.payload.user
  const db = await getDb()
  await db.collection('users')
  const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) })
  console.log(userData)
  const feed = await db
    .collection(COL)
    .find({ nickname: { $in: userData.following } })
    .toArray()
  res.json(feed)
}
