const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


var OrderSchema = new mongoose.Schema ({
    id:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        trim: true
    },
    products: Array,
    city: String,
    street:String,
    house_number:Number,
    reference:Number,
    status:String,
    total:Number

}, {timestamps: true})

OrderSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('orders', OrderSchema)