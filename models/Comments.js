
const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


var CommentSchema = new mongoose.Schema ({
    id:String,
    postId : String,
    userId : String,
    body:String,
})

CommentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('comments', CommentSchema)