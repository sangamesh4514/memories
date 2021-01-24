import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../model/userModel.js'

export const signin=async (req,res)=>{
  const {email,password}=req.body
 
 
  try {
     const existingUser=await User.findOne({email})
      if(!existingUser) return  res.status(404).json({message:"user doesn't exist"})

      const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
     if(!isPasswordCorrect) return res.status(404).json({message:"Invalid credentials"})

     const token=jwt.sign({email:existingUser.email,id:existingUser._id},"4514",{expiresIn:"1h"})

    res.status(200).json({result:existingUser,token}) 
  // console.log(token)
  } catch (error) {
    res.status(500).json({message:'something went wrong'})
  }
}


export const signup=async (req,res)=>{

  const {email,password,confirmpassword,firstName,lastName}=req.body;
  
  try {
       const existingUser=await User.findOne({email})
       if(existingUser) return  res.status(404).json({message:"user already exists"})
     
       if(password!==confirmpassword) return res.status(404).json({message:"passwords dont match"})

       const hashedpassword=await bcrypt.hash(password,12)

       const result=await User.create({email,password:hashedpassword,name:`${firstName} ${lastName}`})

       const token=jwt.sign({email:result.email,id:result._id},"4514",{expiresIn:"1h"})
    
        res.status(200).json({result,token})
  } catch (error) {
    
  }

  
}