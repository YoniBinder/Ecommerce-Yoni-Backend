const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

var BlogSchema = new Schema ({
    id:String,
    title : String,
    description : String,
    category:String,
    image:String,
    author:String

})

BlogSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('blogs', BlogSchema)