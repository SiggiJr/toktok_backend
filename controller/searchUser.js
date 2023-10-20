import { getDb } from '../utils/db.js'

const COL = 'users'

export const searchUser = async (req, res) => {
  const input = req.body.requested_users
  console.log(input)
  const regex = new RegExp(`${input}`, 'i')
  // console.log(/siggi/i)
  console.log(regex)
  const db = await getDb()
  const usersData = await db
    .collection(COL)
    .find({ nickname: { $regex: regex } })
    .toArray()
  res.json(usersData)
}
