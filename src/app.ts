import express from 'express'
import router from './router'

const app = express()

app.use('/api', router)

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
