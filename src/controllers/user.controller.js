const userServices = require('../services/user.service');
const registerSchema = require('../schemas/register.schema.js');
const loginSchema = require('../schemas/login.schema');


const createUser = async (req,res) => {
    try {
        const {error,value} = registerSchema.validate(req.body);
        
        if(error){
            throw new Error(error.message);
        }

        const userDetails = req.body;
        const user = await userServices.createUser(userDetails);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


const loginUser = async (req,res) => {
    try {
        const {error,value} = loginSchema.validate(req.body);
        if(error){
            throw new Error(error.message);
        }
        const userDetails = req.body;
        const token = await userServices.loginUser(userDetails);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const validateToken = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await userServices.validateToken(token);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {createUser,loginUser,validateToken};
    