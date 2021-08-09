const express = require('express');
const fs = require('fs');
const router = express.Router();
const database = './data/posts.json';
const Post = require('../models/post.js');

//Get all posts
router.get('/posts', (req, res) => {
    try {
        let posts = Post.allPosts;
        console.log(posts);
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(404).send('Could not read database file.')
    }
});

//Add new post
router.post('/posts', (req, res) => {
    try {
        Post.createPost(req.body)
        res.status(201).send('Post was successfully added to database');
    } catch (err) {
        console.log(err);
        res.status(404).send('An error occured during adding post to database')
    }
});

// update comments and reaction counts
router.put('/posts/:id/:path', (req, res) => {
    let id = req.params.id;
    let path = req.params.path

    try {
        Post.update(id, path, req);
        res.status(200).send('Post was successfully updated.');
    } catch (err) {
        console.log(err);
        res.status(404).send('Could not update the post.')
    }
})

module.exports = router;
