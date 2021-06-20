const mongoose = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');


var StoreSchema = new mongoose.Schema ({
    id:String,
    storeName: String,
    storeAddress: String,
    phoneNumber: String,
    storeEmail: String,
    storePic: String,
})

StoreSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('details', StoreSchema)