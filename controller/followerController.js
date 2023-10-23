import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'

const COL = 'users'

export const updateFollower = async (req, res) => {
  const nickname = req.params.nickname
  console.log('Nickname:', nickname)
  const myId = req.payload.user
  console.log('Payload:', req.payload)
  const db = await getDb()
  const myProfile = await db.collection(COL).findOne({ _id: new ObjectId(myId) })
  const otherProfile = await db.collection(COL).findOne({ nickname: nickname })

  console.log(myProfile.following)

  if (myProfile.following && myProfile?.following.includes(nickname)) {
    const followingIndex = myProfile.following.indexOf(nickname)
    myProfile.following.splice(followingIndex, 1)
    const followerIndex = otherProfile.follower.indexOf(myProfile.nickname)
    otherProfile.follower.splice(followerIndex, 1)
  } else if (!myProfile.following) {
    myProfile.following = [nickname]
    otherProfile.follower = [myProfile.nickname]
  } else {
    myProfile.following.push(nickname)
    if (!otherProfile.follower) {
      otherProfile.follower = [myProfile.nickname]
    } else {
      otherProfile.follower.push(myProfile.nickname)
    }
  }

  await db.collection(COL).updateOne({ _id: new ObjectId(myId) }, { $set: { ...myProfile } })
  await db.collection(COL).updateOne({ nickname: nickname }, { $set: { ...otherProfile } })

  res.end()
}
