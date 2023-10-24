import { ObjectId } from 'mongodb'
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
    await db.collection(COL).insertOne(data)
  } catch (err) {
    console.log(err)
  }
  // const post = await db.collection(COL).findOne({ profile_image_id: data.profile_image_id })
  // console.log(post)
  // const userData = await db.collection('users').findOne({ _id: new ObjectId(data.owner) })
  // if (!userData.posts) {
  //   console.log(userData.posts)
  //   userData.posts = [post._id]
  // } else {
  //   userData.posts.push(post._id)
  // }
  // const update = await db.collection('users').updateOne({ _id: new ObjectId(data.owner) }, { $set: { ...userData } })
  res.json({ id: data.image_id })
}

export const getImageUrl = async (req, res) => {
  const imageId = req.params.imageId
  const db = await getDb()
  const postData = await db.collection(COL).findOne({ imageId: imageId })
  res.json({ imageUrl: postData.image_url })
}

export const newPost = async (req, res) => {
  const postData = req.body
  console.log(postData)
  const db = await getDb()
  const post = await db.collection(COL).findOne({ image_id: postData.imageId })
  const userData = await db.collection('users').findOne({ _id: new ObjectId(post.owner) })
  if (!userData.posts) {
    userData.posts = [post._id]
  } else {
    userData.posts.push(post._id)
  }
  console.log(post)
  db.collection(COL).updateOne(
    { image_id: postData.imageId },
    {
      $set: { ...postData },
      $set: { owner_image: userData.profile_image_url },
    },
  )
  db.collection(COL).updateOne(
    { image_id: postData.imageId },
    {
      $unset: { image_id: 1 },
    },
  )
  const update = await db.collection('users').updateOne({ _id: new ObjectId(post.owner) }, { $set: { ...userData } })
  res.end()
}

export const handleLike = async (req, res) => {
  const nickname = req.body.nickname
  const postId = req.body.postId
  console.log(nickname, postId)
  const db = await getDb()
  const post = await db.collection(COL).findOne({ _id: new ObjectId(postId) })
  if (!post.likes) {
    post.likes = [nickname]
  } else if (post.likes.includes(nickname)) {
    const index = post.likes.indexOf(nickname)
    post.likes.splice(index, 1)
  } else {
    post.likes.push(nickname)
  }
  await db.collection(COL).updateOne({ _id: new ObjectId(postId) }, { $set: { ...post } })

  res.json(post)
}
