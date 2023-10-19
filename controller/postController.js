import { getDb } from '../utils/db.js'
import { uploadImage } from '../utils/imageService.js'

const COL = 'posts'

export const upload = async (req, res) => {
  const data = req.body
  console.log(req.body)
  const db = await getDb()
  try {
    const cloudinaryResult = await uploadImage(req.file.buffer)
    data.image_url = cloudinaryResult.secure_url
    data.image_id = cloudinaryResult.public_id
    db.collection(COL).insertOne(data)
  } catch (err) {
    console.log(err)
  }
  const post = await db.collection(COL).findOne({ profile_image_id: data.profile_image_id })
  res.json({ id: data.image_id })
}

export const newPost = async (req, res) => {
  const postData = req.body
  const db = await getDb()
  db.collection(COL).updateOne(
    { image_id: postData.imageId },
    {
      $set: { ...postData },
    },
  )
  db.collection(COL).updateOne(
    { image_id: postData.imageId },
    {
      $unset: { image_id: 1 },
    },
  )
  res.end()
}
