import Post from '../models/post'
import User from '../models/user'
import { postUniqueId } from '../config/uuid'

interface AddPost {
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

interface GetPost {
  page: string | number
  userid: string | number
}

interface HideInfo {
  postid: string | number
  userid: string | number
}

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
    const res = await new Post({ postid: postUniqueId(), ...postInfo }).save()
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

// 获取帖子分页列表
export const getListModel = async ({ page, userid }: GetPost) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const hides = user.hides
    const skipcount = (Number(page) - 1) * 10
    const res = Post.find({ postid: { $nin: hides } })
      .skip(skipcount)
      .limit(10)
      .exec()
    if (!res) {
      throw new Error(`No post found`)
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取帖子总数
export const getTotalModel = async () => {
  try {
    const res = (await Post.find().exec()).length
    if (!res) {
      throw new Error('Could not find')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取热门搜索列表
export const getHotModel = async () => {
  try {
    const res = await Post.find().sort({ searched: -1 }).limit(10)
    if (!res) {
      throw new Error('Could not find')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取搜索列表
export const getSearchModel = async (keyword: string) => {
  try {
    const reg = new RegExp(`${keyword}`, 'i')
    const res = await Post.find({ content: { $regex: reg } }).exec()
    if (!res) {
      throw new Error('Could not find')
    }
    // 对应 searched + 1
    res.forEach(async (post) => {
      await Post.updateOne({ postid: post.postid }, { $inc: { searched: 1 } })
    })
    return res
  } catch (error) {
    return false
  }
}

// 增加浏览
export const updateViewModel = async (postid: string | number) => {
  try {
    const post = Post.findOne({ postid: postid }).exec()
    if (!post) {
      throw new Error('No post found')
    }
    const res = Post.updateOne({ postid: postid }, { $inc: { view: 1 } })
    if (!res) {
      throw new Error('Failed to update post')
    }
    return res
  } catch (error) {
    return false
  }
}

// 喜欢
export const updateLikeModel = async (postid: string | number) => {
  try {
    const post = Post.findOne({ postid: postid }).exec()
    if (!post) {
      throw new Error('No post found')
    }
    const res = Post.updateOne({ postid: postid }, { $inc: { like: 1 } })
    if (!res) {
      throw new Error('Failed to update post')
    }
    return res
  } catch (error) {
    return false
  }
}

// 收藏
export const updateStarModel = async (postid: string | number) => {
  try {
    const post = Post.findOne({ postid: postid }).exec()
    if (!post) {
      throw new Error('No post found')
    }
    const res = Post.updateOne({ postid: postid }, { $inc: { star: 1 } })
    if (!res) {
      throw new Error('Failed to update post')
    }
    return res
  } catch (error) {
    return false
  }
}

// 隐藏
export const hideModel = async ({ postid, userid }: HideInfo) => {
  try {
    const updateUserResult = await User.findOneAndUpdate(
      { userid: userid },
      { $push: { hides: postid } }
    )
    if (!updateUserResult) {
      throw new Error('Failed to update user')
    }
    return updateUserResult
  } catch (error) {
    return false
  }
}

// 举报
export const reportModel = async (postid: number | string) => {
  try {
    const res = await Post.findOneAndUpdate(
      { postid: postid },
      { $set: { isReport: 1 } }
    ).exec()
    if (!res) {
      throw new Error('failed to find')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取举报列表
export const reportListModel = async () => {
  try {
    const res = Post.find({ isReport: 1 }).exec()
    if (!res) {
      throw new Error('failed to find')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取帖子详情
export const detailModel = async (postid: number | string) => {
  try {
    const post = Post.findOne({ postid: postid })
    if (!post) {
      throw new Error('No post found')
    }
    return post
  } catch (error) {
    return false
  }
}
