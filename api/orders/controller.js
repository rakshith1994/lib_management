import { fetchOrder, insertOrder } from "./services.js";

export const getOrder = (req, res) =>{
    fetchOrder(req, (err,results)=>{
        if(err){
            res.status|(200).send({status:0, data:err});
        }else{
            res.status|(200).send({status:1, data:results});
        };
    })
}

export const addOrder = (req, res) =>{
    insertOrder(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}