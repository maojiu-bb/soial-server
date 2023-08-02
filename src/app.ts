import express from 'express'
import router from './router'
import cors from 'cors'
// import AV from 'leancloud-storage'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006')
})
