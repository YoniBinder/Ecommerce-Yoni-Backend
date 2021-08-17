var express = require('express');
var router = express.Router();
var GetComments = require('../controllers/CommentsController/get-comments')
var GetOneComment = require('../controllers/CommentsController/get-one-comment')

router.get('/',  GetComments.commentsIndex);
router.get('/:id', GetOneComment.findOneComment);

module.exports = router;