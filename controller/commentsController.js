import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid'

const COL = 'posts'

export const addComment = async (req, res) => {
  const userId = req.payload.user
  const postId = req.params.postid
  console.log('postId', postId)
  const comment = req.body
  const db = await getDb()
  const post = await db.collection(COL).findOne({ _id: new ObjectId(postId) })
  console.log('Post', post)
  comment.owner = userId
  comment.timestamp = new Date()
  comment.comment_id = uuidv4()
  comment.likes = []
  comment.replies = []
  post.comments.push(comment)
  await db.collection(COL).updateOne({ _id: new ObjectId(postId) }, { $set: { ...post } })
  // console.log(post)
  res.end()
}

export const handleCommentLike = async (req, res) => {
  const { nickname } = req.body
  const { postId, commentId } = req.body
  const db = await getDb()
  const post = await db.collection(COL).findOne({ _id: new ObjectId(postId) })

  post.comments.forEach(comment => {
    if (comment.comment_id === commentId && comment.likes.includes(nickname)) {
      const index = comment.likes.indexOf(nickname)
      comment.likes.splice(index, 1)
    } else if (comment.comment_id === commentId && !comment.likes.includes(nickname)) {
      comment.likes.push(nickname)
    }
  })

  await db.collection(COL).updateOne({ _id: new ObjectId(postId) }, { $set: { ...post } })

  res.json(post)
}

export const addReply = async (req, res) => {
  const { nickname, postId, commentId, reply } = req.body
  const db = await getDb()
  const post = await db.collection(COL).findOne({ _id: new ObjectId(postId) })
  post.comments.forEach(comment => {
    if (comment.comment_id === commentId) {
      const replyData = { nickname, reply, timestamp: new Date() }
      comment.replies.push(replyData)
    }
  })
  await db.collection(COL).updateOne({ _id: new ObjectId(postId) }, { ...post })
  res.end()
}
