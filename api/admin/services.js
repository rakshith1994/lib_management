import pool from '../../database.js';
import * as bcrypt from 'bcrypt';

export const getUser = (data, callback)=>{
    pool.query('select * from admin WHERE email=?',[data.params.email],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            const res = results[0];
            callback(null, {status:1,id:res.id,email: res.email, password: res.password});
        }
    });
}

export const insertUser = async(data, callback)=>{
    console.log(data);
    const password = await bcrypt.hash(data.password, 10);
    console.log(password)
    pool.query('Insert into admin (email, password) values (?,?)',[data.email, password],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

