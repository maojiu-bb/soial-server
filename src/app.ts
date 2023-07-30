import express from 'express'
import router from './router'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3006, () => {
  console.log('Server is running at http://localhost:3006')
})
