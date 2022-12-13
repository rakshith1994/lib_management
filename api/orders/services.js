import pool from '../../database.js';

const fetchOrder = (data, callback)=>{
    pool.query('select * from order where id=?',[data.params.id],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const insertOrder = (data, callback)=>{
    const {customerId, date, bookId=null} = data;
    if(!bookId)return callback(new Error("bookId field is missing"),null);
    pool.getConnection((err, connection)=>{
        connection.beginTransaction((err)=>{
            connection.query('insert into orders (customer_id, date) values (?,?)',[customerId, date],(err,results,fields)=>{
                if(err){
                    connection.rollback();
                    callback(new Error("Failed to insert data into orders table"),null);
                }else{
                    const values = [];
                    for(const k of bookId){
                        values.push([customerId,k]);
                    };
                    connection.query('insert into rln_books_orders (order_id, book_id) values ?',[values],(err,results,fields)=>{
                        if(err){
                            connection.rollback();
                            callback(new Error("Failed to insert data into rln_books_orders table"),null);
                        }else{
                            connection.commit((err)=>{
                                if(err){
                                    connection.rollback();
                                }else{
                                    callback(null, results);
                                };
                           });
                        }
                    });
                }
            });
        });
    });
}

const updateOrder = async (data, callback) =>{
    const {orderdId=null,bookId = null} = data;
    if(!bookId)return callback(new Error("bookId is missing"),null);
    if(!orderId)return callback(new Error("orderId is missing"),null);
    pool.query('insert into rln_books_orders (order_id, book_id) values ?',[values],(err,results,fields)=>{

    }); 
};

export {fetchOrder, insertOrder, updateOrder};