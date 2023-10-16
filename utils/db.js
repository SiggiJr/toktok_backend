import { MongoClient } from 'mongodb'

const URL = process.env.MONGO_DB_URL
const DATABASE = process.env.MONGO_DB_DATABASE

const client = new MongoClient(URL)

let db

export const getDb = async () => {
  if (db) return db
  await client.connect()
  db = client.db(DATABASE)
  return db
}
