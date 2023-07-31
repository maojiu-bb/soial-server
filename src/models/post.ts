import { Schema, Document } from 'mongoose'
import db from '../db'

interface Image {
  imgid: string | number
  imgUrl: string
}

interface Post {
  postid: number | string
  userid: number | string
  username: string
  date: string
  avatar: string
  content: string
  images: Image[]
  view: number
  like: number
  star: number
  comment: number
}

const postSchema = new Schema<Post & Document>({
  postid: { type: Schema.Types.Mixed, required: true },
  userid: { type: Schema.Types.Mixed, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true },
  avatar: { type: String, required: true },
  content: { type: String, default: '' },
  images: [
    {
      imgid: { type: Schema.Types.Mixed, required: true },
      imgUrl: { type: String, required: true }
    }
  ],
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  star: { type: Number, default: 0 },
  comment: { type: Number, default: 0 }
})

const Post = db.model<Post & Document>('Post', postSchema)

export default Post
