import Post from '../models/post'
import User from '../models/user'

interface AddPost {
  postid: string | number
  userid: string | number
  username: string
  date: string
  avatar: string
  content: string
  images: { imgid: string | number; imgUrl: string }[]
}

interface EditPost {
  postid: string | number
  content: string
  images: { imgid: string | number; imgUrl: string }[]
}

type DeletePost = string | number

// 发布帖子
export const addPostModel = async (postInfo: AddPost) => {
  try {
    const user = await User.findOne({
      userid: postInfo.userid,
      username: postInfo.username
    }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const res = await new Post(postInfo).save()
    if (!res) {
      throw new Error('Error saving post')
    }
    return res
  } catch (error) {
    return false
  }
}

// 修改帖子
export const editPostModel = async ({ postid, content, images }: EditPost) => {
  try {
    const post = Post.findOne({ postid: postid }).exec()
    if (!post) {
      throw new Error('Post not found')
    }
    const res = Post.updateOne(
      { postid: postid },
      { $set: { content: content, images: images } }
    )
    if (!res) {
      throw new Error('Error updating post')
    }
    return res
  } catch (error) {
    return false
  }
}

// 删除帖子
export const deletePostModel = async (postid: DeletePost) => {
  try {
    const post = await Post.findOne({ postid: postid }).exec()
    if (!post) {
      throw new Error('Post not found')
    }
    const res = await Post.deleteOne({ postid: postid })
    if (!res) {
      throw new Error('Error deleting post')
    }
    return res
  } catch (error) {
    return false
  }
}
