const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auths')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require("multer");
const path = require("path");

// app.use(cors({ origin: '*', credentials: true}))
app.use(cors())
app.get('/', (req, res) => {
    res.set({
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS'
    });

    User.find({}, function(err, users){
        

        if(err)
        {
            return res.status(500).send({err});
        }
        return res.send(users);
    });
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute) 
app.use('/api/categories', categoryRoute) 


const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})