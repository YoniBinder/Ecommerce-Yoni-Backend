var express = require('express');
var router = express.Router();

var GetPosts = require('../controllers/PostsController/get-posts')
var GetOnePost = require('../controllers/PostsController/get-one-post')

router.get('/',  GetPosts.postsIndex);
router.get('/:id', GetOnePost.findOnePost);

module.exports = router;