import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid'

export const addComment = async (req, res) => {
  const userId = req.payload.user
  const postId = req.params.postid
  console.log(postId)
  const comment = req.body
  const db = await getDb()
  const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) })
  console.log(post)
  comment.owner = userId
  comment.timestamp = new Date()
  comment.comment_id = uuidv4()
  comment.likes = []
  post.comments.push(comment)
  await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: { ...post } })
  // console.log(post)
  res.end()
}
