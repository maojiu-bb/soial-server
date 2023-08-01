import { historyId } from '../config/uuid'
import SearchHistory from '../models/history'
import User from '../models/user'

interface CreateInfo {
  userid: string | number
  keyword: string
}

interface DeleteOne {
  userid: string | number
  historyid: string | number
}

// 创建搜索历史
export const createModel = async ({ userid, keyword }: CreateInfo) => {
  try {
    const user = await User.findOne({ userid: userid }).exec()
    if (!user) {
      throw new Error('User not found')
    }
    const insertInfo = {
      userid,
      historyid: historyId(),
      keyword,
      createTime: Date.now()
    }
    const res = await new SearchHistory(insertInfo).save()
    if (!res) {
      throw new Error('Error saving search history')
    }
    return res
  } catch (error) {
    return false
  }
}

// 获取搜索历史
export const allHistoryModel = async (userid: number | string) => {
  try {
    const res = await SearchHistory.find({ userid: userid })
    if (!res) {
      throw new Error('Failed to find')
    }
    return res
  } catch (error) {
    return false
  }
}

// 删除一条搜索历史
export const deleteOneModel = async ({ userid, historyid }: DeleteOne) => {
  try {
    const res = await SearchHistory.findOneAndRemove({
      userid: userid,
      historyid: historyid
    })
    if (!res) {
      throw new Error('Failed to delete')
    }
    return res
  } catch (error) {
    return false
  }
}

// 清空搜索历史
export const deleteAllModel = async (userid: string | number) => {
  try {
    const res = await SearchHistory.deleteMany({ userid: userid })
    if (!res) {
      throw new Error('Failed to delete')
    }
    return res
  } catch (error) {
    return false
  }
}
