import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

const COL = 'users'

export const getUserData = async (req, res) => {
  console.log(req.payload)
  const db = await getDb()
  const userData = await db.collection(COL).findOne({ _id: new ObjectId(req.payload.user) })
  res.json(userData)
}

export const getProfileData = async (req, res) => {
  const profileId = req.params.id
  const db = await getDb()
  const profileData = await db.collection(COL).findOne({ _id: new ObjectId(profileId) })
  res.json(profileData)
}
