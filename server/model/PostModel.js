import mongoose from 'mongoose'

const PostSchema=mongoose.Schema({
   title:String,
   message:String,
   name:String,
   creator:String,
   tags:[String],
   selectedFile:String,
   likes:{
     type:[String],
     default:[]
   },
   createdAt : {
     type:Date,
     default:new Date()
   },
})

const PostModel=mongoose.model("PostModel",PostSchema)

export default PostModel