const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auths')

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


const port = 5500
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})