import db from '../schema/db.connection.js';
import jwt from 'jsonwebtoken';
export const getPosts = (req , res)=> {
 const q = req.query.cat ? 'SELECT * FROM posts WHERE cat = ?' : 'SELECT * FROM posts';

    db.query(q , [req.query.cat] , (err , data)=> {
        if(err) return res.json(err);
        return res.status(200).json(data);
    })
}


export const getPost = (req , res)=> {
        const q = 'SELECT p.id , `username` ,`title` , `description` , p.img ,u.img AS userImg ,  `cat` , `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? ';
        db.query(q , [req.param.id] ,(err , data)=> {
            if(err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
        })
}

export const addPost = (req , res)=> {
    const token = req.cookies.access_token; 
    if(!token) return res.status(401).json('Not authenicated');
      jwt.verify(token , 'SecPassowrd' ,(err ,userInfo)=> {
          if(err) return res.status(403).json('Token is not valid');
            const q = 'INSERT INTO posts(`title` , `description` , `img` , `cat` , `date` , `uid`) VALUES (?)';
            const values = [
                req.body.title,
                req.body.description,
                req.body.img,
                req.body.cat,
                req.body.date,
                userInfo.id
            ]

            db.query(q , [values] , (err , data)=> {
                return res.json('Post has been created.')
            })
      })
}

export const deletePost = (req , res)=> {
  const token = req.cookies.access_token; 
  if(!token) return res.status(401).json('Not authenicated');
    jwt.verify(token , 'SecPassowrd' ,(err ,userInfo)=> {
        if(err) return res.status(403).json('Token is not valid');
            const postId = req.params.id;
                const q = 'DELTE FROM posts WHERE `id` = ? AND uid = ? ';
            db.query(q , [postId , userInfo.id], (err , data)=> {
                if(err) return res.status(403).json('You can delete only your post');
                    return res.json('Post has been deleted');
            })
    })
}

export const updatePost = (req , res)=> {
   
    const token = req.cookies.access_token; 
    if(!token) return res.status(401).json('Not authenicated');
      jwt.verify(token , 'SecPassowrd' ,(err ,userInfo)=> {
          if(err) return res.status(403).json('Token is not valid');
            const q = 'UPDATE posts SET `title`=? , `description` , `img`=? , `cat`= ? WHERE `id` =? AND `uid` = ? ';
            const values = [
                req.body.title,
                req.body.description,
                req.body.img,
                req.body.cat,

            ]

            db.query(q , [...values , req.body.id , userInfo.id] , (err , data)=> {
                return res.json('Post has been updated.')
            })
      })
  }