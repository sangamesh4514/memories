import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/posts.js'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'

const app=express()
dotenv.config()



app.use(bodyParser.json({limit:"30mb",extended:"true"}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:"true"}))
app.use(cors())
app.use('/posts',router)
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
     res.send('hello to memories API')
})

const CONNECTION_URL="mongodb+srv://sangamesh4514:sam@4514@cluster0.lun0j.mongodb.net/memory?retryWrites=true&w=majority"
const PORT=(process.env.PORT||5000)

mongoose.connect(CONNECTION_URL,{"useNewUrlParser":true,"useUnifiedTopology":true})
     .then(()=>{app.listen(PORT,console.log(`connection successful at: ${PORT}`))})
     .catch((err)=>{console.log(err)})