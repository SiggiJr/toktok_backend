import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

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
  comment.comment_id = crypto.randomUUID
  post.comments.push(comment)
  await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: { ...post } })
  // console.log(post)
  res.end()
}
