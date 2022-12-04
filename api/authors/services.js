import pool from '../../database.js';

const fetchUser = (data, callback)=>{
    pool.query('select * from author WHERE id=?',[data.params.name],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}


const insertAuthor = (data, callback)=>{
    pool.query('Insert into author (name, book_id) values (?,?)',[data.name, data.bookId],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const insertAuthors = (data, callback)=>{
    pool.query('Insert into author (name) values ?',[data],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

export {fetchUser, insertAuthor, insertAuthors};