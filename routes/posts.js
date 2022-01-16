const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const Posts = require(',.models/post')
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
  try {
    const post = await Posts.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router