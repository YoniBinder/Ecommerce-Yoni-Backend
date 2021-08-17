let mongoose = require("mongoose")

mongoose.connect(
    `mongodb+srv://yoni:${process.env.MONGO_PASS}@storedb.nzje0.mongodb.net/StoreDB?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology: true
    }).then(
        ()=>console.log("Mongo database connected")
        
    ).catch(
        err=>console.log(err)
    )


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);