import pool from '../../database.js';

const fetchUser = (data, callback)=>{
    pool.query('select * from customer where id=?',[data.params.id],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}


const inserthUser = (data, callback)=>{
    const {firstName, phNo, email, lastName} = data;
    pool.query('insert into customer (first_name, ph_no,email, last_name) values(?,?,?,?)',[firstName, phNo, email, lastName],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const getAll = (data, callback)=>{
    pool.query('select * from customer',null,(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}



export {fetchUser, inserthUser, getAll};