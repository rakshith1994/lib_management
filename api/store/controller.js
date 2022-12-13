import { getOrdersByCustomerId } from "./";

export const getOrdersByUserId = (req, res) =>{
    getOrdersByCustomerId(req, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}