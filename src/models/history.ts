import { Schema, Document } from 'mongoose'
import db from '../db'

interface SearchHistory {
  userid: string | number
  historyid: string | number
  keyword: string
  createTime: number | string
}

const SearchHistorySchema = new Schema<SearchHistory & Document>({
  userid: { type: Schema.Types.Mixed, required: true },
  historyid: { type: Schema.Types.Mixed, required: true },
  keyword: { type: String, required: true },
  createTime: { type: Schema.Types.Mixed, required: true }
})

const SearchHistory = db.model('SearchHistory', SearchHistorySchema)

export default SearchHistory
