const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/register', async(req,res)=> {
  try{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt)
    const user = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash
    })
    res.status(200).json(user)

  }catch(err){
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const isValid = await bcrypt.compare(req.body.password, user.password);
    !isValid && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router