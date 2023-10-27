import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

const COL = 'posts'

export const getUserFeed = async (req, res) => {
  const userId = req.payload.user
  const db = await getDb()
  // await db.collection('users')
  const userData = await db.collection('users').findOne({ _id: new ObjectId(userId) })
  const feed = await db
    .collection(COL)
    .find({ nickname: { $in: userData.following } })
    .sort({ timestamp: -1 })
    .toArray()
  const profiles = await db
    .collection('users')
    .find({ nickname: { $in: userData.following } })
    .toArray()
  feed.forEach(post => {
    profiles.forEach(profile => {
      if (profile.nickname === post.nickname) {
        post.profession = profile.profession
      }
    })
  })
  res.json(feed)
}

export const getOwnFeed = async (req, res) => {
  const ownId = req.payload.user
  const db = await getDb()
  const ownFeed = await db.collection(COL).find({ owner: ownId }).sort({ timestamp: -1 }).toArray()
  res.json(ownFeed)
}

export const getOtherFeed = async (req, res) => {
  const userId = req.params.id
  const db = await getDb()
  const posts = await db.collection(COL).find({ owner: userId }).sort({ timestamp: -1 }).toArray()
  res.json(posts)
}
