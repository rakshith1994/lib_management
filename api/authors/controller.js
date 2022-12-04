import { fetchUser, insertAuthor, insertAuthors } from "./services.js";

export const getAuthor = (req, res) =>{
    fetchUser(req, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

export const addAuthor = (req, res) =>{
    insertAuthor(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}

export const addAuthors = (req, res) =>{
    insertAuthors(req.body, (err,results)=>{
        if(err){
            res.status(200).json({status:0, data:err});
        }else{
            res.status(200).json({status:1, data:results});
        };
    })
}