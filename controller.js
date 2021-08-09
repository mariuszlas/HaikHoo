const express = require('express');
const router = express.Router();
const posts = require('./data');

//Get all posts
router.get('/posts',(req,res)=>{
    res.send(posts);
});

//Get post based on ID
router.get('/posts/:index', (req, res)=>{
    const postIndex = req.params.index;
    const post = posts[postIndex];
    res.send(post);
});

//Add new post
router.post('/posts', (req, res)=>{    
    const post = req.body;
    console.log(post)
    const newPostID = posts.length;
    posts.push({ id: newPostID, ...post});
    // res.status(201)
    res.send(post); 
});

module.exports = router;