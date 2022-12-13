import { fetchUser, inserthUser, getAll } from "./services.js";

export const getUser = (req, res) =>{
    fetchUser(req, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

export const addUser = (req, res) =>{
    inserthUser(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

export const getAllCustomers = (req, res) =>{
    getAll(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

