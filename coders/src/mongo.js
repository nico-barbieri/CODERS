const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://coder:coder-123@coders.e0b5gtc.mongodb.net/main?retryWrites=true&w=majority")
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

const collection = new mongoose.model('loginCollections',logInSchema)

module.exports = collection
