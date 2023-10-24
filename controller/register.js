import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'
import { createToken } from '../utils/token.js'
import { uploadImage } from '../utils/imageService.js'

const COL = 'users'

export const register = async (req, res) => {
  const db = await getDb()
  await db.collection(COL).insertOne({ email: req.body.email, password: req.body.password })
  const user = await db.collection(COL).findOne({ email: req.body.email, password: req.body.password })
  res.cookie('token', createToken({ user: user._id }), {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
  })
  res.json(JSON.stringify({ id: user._id }))
}

export const createProfile = async (req, res) => {
  const data = req.body
  console.log(data)
  try {
    if (req.file) {
      const cloudinaryResult = await uploadImage(req.file.buffer)
      data.profile_image_url = cloudinaryResult.secure_url
      data.profile_image_id = cloudinaryResult.public_id
      console.log(data)
    }
    const db = await getDb()
    db.collection(COL).updateOne(
      { _id: new ObjectId(data.id) },
      {
        $set: { ...data, following: [], follower: [], posts: [] },
      },
    )
    db.collection(COL).updateOne(
      { _id: new ObjectId(data.id) },
      {
        $unset: { id: 1 },
      },
    )
  } catch (err) {
    console.log(err)
  }

  res.json(req.body.nickname)
}
