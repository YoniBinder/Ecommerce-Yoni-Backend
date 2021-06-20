// const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


var ProductSchema = new mongoose.Schema ({
    id:String,
    title : String,
    description : String,
    hardware : Boolean,
    image : String,
    onsale : Number,
    price : Number,
    rating : Number,
})

ProductSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('products', ProductSchema)