import { getUser, insertUser } from "./services.js";

export const fetchUser = (req, res) =>{
    getUser(req, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

export const addUser = (req, res) =>{
    insertUser(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}