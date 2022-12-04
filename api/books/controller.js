import { fetchBook, insertBook, insertBooks, updateBooks} from "./services.js";

export const getbook = (req, res) =>{
    fetchBook(req.query, (err,results)=>{
        if(err){
            res.status|(200).send({status:0, data:err});
        }else{
            res.status|(200).send({status:1, data:results});
        };
    })
}

export const addBook = (req, res) =>{
    insertBook(req.body, (err,results)=>{
        if(err){
            res.status(200).send({status:0, data:err});
        }else{
            res.status(200).send({status:1, data:results});
        };
    })
}

export const addBooks = (req, res) =>{
    insertBooks(req.body, (err,results)=>{
        if(err){
            res.status(200).send({status:0, data:err});
        }else{
            res.status(200).send({status:1, data:results});
        };
    })
}

export const modifyBooks = async(req, res)=>{
    updateBooks(req.body, (err,results)=>{
        if(err){
            res.status(200).send({status:0, data:err});
        }else{
            res.status(200).send({status:1, data:results});
        };
    })
};