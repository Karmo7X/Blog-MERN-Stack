import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import PostRoute from './routes/posts.js'
import UserRoute from './routes/users.js'
import authRoute from './routes/auth.js'
dotenv.config(); 
const app = express();
const port = process.env.PORT || 5000;
const storage = multer.diskStorage({
    destination : function(req , file ,cb ){
        cb(null , '../client/public/upload');
    },
    filename : function (req , file , cb){
        cb(null , Date.now()+file.originalname);
    }
})
const upload = multer({storage})

app.post('/api/upload' , upload.single('file') , function(req , res){
    const file = req.file;
    res.status(200).json(file.filename);
})


//Middle ware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/posts' , PostRoute);
app.use('/api/users' , UserRoute);
app.use('/api/auth' , authRoute);

app.listen(port , ()=> console.log(`http://localhost:${port}`));