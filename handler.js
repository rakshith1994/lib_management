import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { getUser } from './api/admin/services.js';

dotenv.config();

const key = process.env.JWT_SECRET_KEY;
const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS; 

export const signIn = async(req, res)=>{
    const {email, password: inputPassword} = req.body;
    getUser({params:{email}},async(err, result)=>{
        if(err){
            res.status(500).json({status:0,result: "server down"});
            return;
        };

        if(result.status == 1){
            const {email, password} = result;
            const match = await bcrypt.compare(inputPassword, password);
            if(match){
                const token = jwt.sign({email}, key, { algorithm:"HS256", expiresIn: `${jwtExpirySeconds}s` });       
                res.cookie('access_token',token,{maxAge: jwtExpirySeconds * 1000});
                res.status(200).json({
                    status:"success",
                    access_token: token
                });
            }else{
                res.status(401).json({status:0,result: "incorrect password"});
            };
        }else{
            res.status(401).json({status:0,result: "unauthorized_client"});
        };
    });
};

export const refresh = (req, res) =>{
    const token  = req.headers.authorization.substring(7);
    try{
        const payload = jwt.verify(token, key);

        if((Number(new Date()/1000) - payload.exp)  > jwtExpirySeconds){
            res.status(400).json({status:0, result: "Token exipred"});
        }

        const jwtToken = jwt.sign({email: payload.email}, key, { algorithm:"HS256", expiresIn: `${jwtExpirySeconds}s` });       
        res.cookie('access_token',jwtToken,{maxAge: jwtExpirySeconds * 1000});
        res.status(200).json({
            status:"success",
            access_token: jwtToken
        });

    }catch(e){
        console.log(e);
        res.status(401).json({status:0, result: "unauthorized_client"});
    };
};

export const authorize = (req, res, next) =>{
    let token = req.headers.authorization;

    if(!token){
        res.status(401).json({status:0, result:"unauthorized_client"})
    };

    token = token.substring(7);
    try{
        const isValid = jwt.verify(token,key);
        if(isValid.email){
            next();
        };
    }catch(e){
        console.log(e);
        res.status(401).json({status:0, result: "unauthorized_client"});
    }
    
}


