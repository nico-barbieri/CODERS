const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/test", {useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model('collection',logInSchema)

module.exports = collection
