import db from '../schema/db.connection.js'
import bycrpt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    //CEHCK EXITING USER
    const queryx = await 'SELECT * FROM users WHERE email = ? OR username = ?';
    await db.query(queryx, [req.body.email, req.body.username], async (err, data) => {
        if (err) return await res.json(err);
        if (data.length) return await res.status(409).json('User already exists!');

        //HASING PASSWORD
        const hash = await bycrpt.hashSync(req.body.password, 10);

        const q = await 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)';
        const values = await [
            req.body.username,
            req.body.email,
            hash
        ];

        db.query(q, [values], async (err, data) => {
            if (err) return await res.json(err);
            return await res.status(200).json('User has been created ...');
        });
    })


}

export const login =async (req, res) => {
    //Check User 
    const q = await 'SELECT * FROM users WHERE username = ?';
    await db.query(q , [req.body.username],async(err , data)=> {
        if(err) return await res.json(err);
        if(data.length === 0) return await res.status(404).json('User not found!');
        console.log(data[0]);
    //Check password
    const isPasswordCorrect = await bycrpt.compareSync(req.body.password , data[0].password);

    if(!isPasswordCorrect) return await  res.status(400).json('Wrong username or passowrd');
        
        const token = await jwt.sign({id :data[0].id},'SecPassowrd');
        const {password , ...other} =await data[0];
       await res.cookie("access_token" ,token , {
            httpOnly:true,

        }).status(200).json(data[0]);
    })
}


export const logout = (req, res) => {
    res.clearCookie('access_token',{
        sameSite:'none',
        secure:true,
    }).status(200).json('User has been logged out');
}