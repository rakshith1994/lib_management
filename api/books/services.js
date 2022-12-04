import pool from '../../database.js';

const fetchBook = (data, callback)=>{
    pool.query('select * from users where name=?',[data.name],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const insertBook = (data, callback)=>{
    pool.query('insert into books (name,cost) values (?,?)',[data.name, data.cost],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const insertBooks = (data, callback)=>{
    pool.query('insert into books (name,cost) values ?',[data],(err,results,fields)=>{
        if(err){
            callback(err,null);
        }else{
            callback(null, results);
        }
    });
}

const updateBooks = async(data, callback)=>{
    const promiseArr = [];

    if(Array.isArray(data)){
        for(const k of data){
            const values = [];
            let q = "update books SET ";
            let flag = false;
            if(k.name){
                if(!flag)flag=true;
                q+="name=? ";
                values.push(k.name);
            };
            if(k.authorId){
                if(flag){
                    q+=",author_id=? ";
                }else{
                    q+="author_id=? ";
                    flag = true;
                }
                values.push(k.authorId);
            };
            if(k.cost){
                if(flag){
                    q+=",cost=? ";
                }else{
                    q+="cost=? ";
                    flag = true;
                }
                
                values.push(k.cost);
            };
            if(k.orderId){
                if(flag){
                    q+=",order_id=? ";
                }else{
                    q+="order_id=? ";
                    flag = true;
                };

                values.push(k.orderId);
            };
           
            q+="WHERE id=?";
            values.push(k.id);
            const q1 = new Promise((resolve, reject)=>{
                pool.query(q,values,(err,results,fields)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                })
            })
            promiseArr.push(q1);
 
        };

        Promise.all(promiseArr).then((results)=>{
            callback(null,results); 
        },(error)=>{
            callback(error,null); 
        })
       
    }else{
        callback({"error": "Input should be a valid array"},null); 
    }
}

export {fetchBook, insertBook, insertBooks, updateBooks};