let mongoose = require("mongoose")
// mongoose.set('returnOriginal', false)
mongoose.connect(`mongodb+srv://yoni:${process.env.MONGO_PASS}@storedb.nzje0.mongodb.net/StoreDB?retryWrites=true&w=majority`, {useNewUrlParser:true,useUnifiedTopology: true})
// mongoose.connect(`mongodb+srv://store:${process.env.MONGO_PASS}@cluster0.xrhgf.mongodb.net/StoreDB?retryWrites=true&w=majority`, {useNewUrlParser:true})
mongoose.connection.on("connected",()=>console.log("Mongo database connected"))
mongoose.connection.on("error",(err)=>console.log(err))


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);