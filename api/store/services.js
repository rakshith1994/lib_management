import pool from '../../database.js';

const getOrdersByCustomerId = (data, callback)=>{
    pool.query('select customer.first_name, customer.last_name, from customer where id=?',[data.params.id],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

export { getOrdersByCustomerId };