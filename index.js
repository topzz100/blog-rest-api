const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auths')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')

app.use(express.json());

const connectDB = async(url) => {
  try{
    await mongoose.connect(url, () => {
      console.log('connected to DB')
    }); 
    
  }catch(err){
    console.log(err)
  }
  
}
connectDB(process.env.MONGO_URI)

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute) 
app.use('/api/categories', categoryRoute) 


const port = 5500
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})