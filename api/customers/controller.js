import { fetchUser } from "./services.js";

export const getUser = (req, res) =>{
    fetchUser(req.body, (err,results)=>{
        if(err){
            res.status|(200).send({status:0, data:err});
        }else{
            res.status|(200).send({status:1, data:results});
        };
    })
}