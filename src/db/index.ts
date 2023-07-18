import mongoose from 'mongoose'

const db_url = 'mongodb://127.0.0.1:27017/soial'
const db = mongoose.createConnection(db_url, {
  authSource: 'admin',
  user: 'admin',
  pass: 'admin123'
})

export default db
