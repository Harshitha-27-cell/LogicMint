import exp from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { userApp } from './API/UserAPI.js'

config()

const app = exp()

app.use(cors())
app.use(exp.json())

app.use('/user-api', userApp)

mongoose.connect(process.env.DB_URL)
.then(() => {

  console.log('DB connected')

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
  })

})
.catch((err) => {
  console.log(err)
})