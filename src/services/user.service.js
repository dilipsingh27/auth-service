const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { insertInRedis,getFromRedis } = require('../utils/redis');
const dotenv = require('dotenv').config();

const createUser = async (userDetails) => {
    const {username,email,password} = userDetails;
    const userExists = await db.Users.findOne({where:{email}});
    if (userExists) {
        return res.status(400).json({errors:[{ msg: 'User already exists' }] });
    }

    // const salt = await bcrypt.genSalt(10);
    // console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await db.Users.create({username,email,password:hashedPassword,isAdmin:false});
    return user;
    
}



const loginUser = async (userDetails) => {

    const user = await db.Users.findOne({where:{email:userDetails.email}});
    if (!user) {
        return res.status(400).json({errors:[{ msg: 'User does not exist' }] });
    }
    const hashedPassword = user.password;
    // console.log(hashedPassword);
    const isPasswordValid = await bcrypt.compare(userDetails.password, hashedPassword);

    if(!isPasswordValid) {
        return res.status(400).json({errors:[{ msg: 'Password is not valid' }] });
    }

    const token = jwt.sign(user.dataValues, process.env.SECRET);
    // console.log(user.dataValues);
    console.log('before',user.dataValues.id)
    await insertInRedis(token,user.dataValues.id);

    return token;
}


const validateToken = async(token) => {
    console.log("xyz",token);
    const userId = await getFromRedis(token);
    // console.log(userId);
    // if(!userId){
    //     throw new Error('Invalid token');
    // }
    const res =  jwt.verify(token, process.env.SECRET)
    console.log(res);
    return res;
}


module.exports = {createUser,loginUser,validateToken};