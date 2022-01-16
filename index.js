const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');




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


const port = 5000
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})