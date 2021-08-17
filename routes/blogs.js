var express = require('express');
var router = express.Router();
var GetBlogs = require('../controllers/BlogsController/get-blogs')
var GetOneBlog = require('../controllers/BlogsController/get-one-blog')

router.get('/',  GetBlogs.blogsIndex);
router.get('/:id', GetOneBlog.findOneBlog);

module.exports = router;