import { ObjectId } from 'mongodb'
import { getDb } from '../utils/db.js'
import { uploadImage } from '../utils/imageService.js'

export const updateProfile = async (req, res) => {
  const userId = req.payload.user
  const newData = req.body
  const db = await getDb()
  const oldData = await db.collection('users').findOne({ _id: new ObjectId(userId) })

  if (oldData.nickname !== newData.nickname) {
    // update Following
    await db.collection('users').updateMany({ following: { $elemMatch: { $eq: oldData.nickname } } }, [
      {
        $set: {
          following: {
            $map: {
              input: '$following',
              as: 'item',
              in: {
                $cond: [{ $eq: ['$$item', oldData.nickname] }, newData.nickname, '$$item'],
              },
            },
          },
        },
      },
    ])

    // update Follower
    await db.collection('users').updateMany({ follower: { $elemMatch: { $eq: oldData.nickname } } }, [
      {
        $set: {
          follower: {
            $map: {
              input: '$follower',
              as: 'item',
              in: {
                $cond: [{ $eq: ['$$item', oldData.nickname] }, newData.nickname, '$$item'],
              },
            },
          },
        },
      },
    ])

    // update nickname in posts
    await db.collection('posts').updateMany({ nickname: oldData.nickname }, { $set: { nickname: newData.nickname } })

    //update likes in posts
    await db.collection('posts').updateMany({ likes: { $elemMatch: { $eq: oldData.nickname } } }, [
      {
        $set: {
          likes: {
            $map: {
              input: '$likes',
              as: 'item',
              in: {
                $cond: [{ $eq: ['$$item', oldData.nickname] }, newData.nickname, '$$item'],
              },
            },
          },
        },
      },
    ])
    //update nickname in comment.likes

    await db.collection('posts').updateMany(
      { 'comments.likes': oldData.nickname },
      {
        $set: {
          'comments.$[comment].likes.$[like]': newData.nickname,
        },
      },
      {
        arrayFilters: [{ 'comment.likes': oldData.nickname }, { like: oldData.nickname }],
      },
    )
  }
  await db.collection('users').updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...newData,
        follower: oldData.follower,
        following: oldData.following,
        posts: oldData.posts,
        favorites: oldData.favorites,
      },
    },
  )

  try {
    if (req.file) {
      console.log('Ich hab nen Bild')
      const cloudinaryResult = await uploadImage(req.file.buffer)
      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(userId) },
          { $set: { profile_image_url: cloudinaryResult.secure_url, profile_image_id: cloudinaryResult.public_id } },
        )
      await db.collection('posts').updateMany({ owner: userId }, { $set: { owner_image: cloudinaryResult.secure_url } })
    }
  } catch (err) {
    console.log(err)
  }

  res.json(newData.nickname)
}
