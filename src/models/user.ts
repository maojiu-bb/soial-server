import { Schema, Document } from 'mongoose'
import db from '../db'

interface User {
  userid: number | string
  username: string
  password: string
  email: string
  avatar: string
  sex: string
  introduction: string
  address: string
  birthday: string
  backgroundImage: string
  ownPosts: string[]
  likePosts: string[]
  starPosts: string[]
  friends: string[]
  fans: string[]
  concerns: string[]
  hides: string[]
}

const userSchema = new Schema<User & Document>({
  userid: { type: Schema.Types.Mixed, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  sex: { type: String },
  introduction: { type: String },
  address: { type: String },
  birthday: { type: String },
  backgroundImage: { type: String },
  ownPosts: [{ type: String }],
  likePosts: [{ type: String }],
  starPosts: [{ type: String }],
  friends: [{ type: String }],
  fans: [{ type: String }],
  concerns: [{ type: String }],
  hides: [{ type: String }]
})

const User = db.model<User & Document>('User', userSchema)

export default User
