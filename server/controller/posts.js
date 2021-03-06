import  mongoose  from "mongoose"
import PostModel from "../model/PostModel.js"

export const getPost= async (req,res)=>{
  try {
    console.log(req.body)
    const postMessages=await PostModel.find()
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}

export const createPost= async (req,res)=>{
  const post=req.body
//  console.log(req.body)
  const newPost=new PostModel({...post,creator:req.userId,createdAt:new Date().toISOString()})

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message:error.message})
  }
}

export const updatePost=async(req,res)=>{
  const {id:_id}=req.params;
  const post=req.body;
 
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that id')

  const updatedPost=await PostModel.findByIdAndUpdate(_id,post,{new:true})

  res.json(updatedPost)
   
}

export const deletePost=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(409).send('no post with that id')

  await PostModel.findByIdAndDelete(id);
  res.json("deleted")
}

export const likePost=async (req,res)=>{
  const {id}=req.params;

  if(!req.userId) return res.status(500).json({message:"Unauthenticated"})

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(409).send('no post with that id')

   const post= await PostModel.findById(id)
  
   const index=post.likes.findIndex((id)=>id===String(req.userId))

   if(index=== -1){
     post.likes.push(req.userId)
   }else{
     post.likes=post.likes.filter((id)=>id!==String(req.userId))
   }
   
   const updatedPost=await PostModel.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost)

}