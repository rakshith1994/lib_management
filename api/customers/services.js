import pool from '../../database.js';

const fetchUser = (data, callback)=>{
    pool.query('select * from users where email=?',[data.email],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

export {fetchUser};