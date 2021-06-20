const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


var PostSchema = new Schema ({
    id:String,
    blogId : String,
    userId : String,
    body:String,
    title:String
})

PostSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('posts', PostSchema)