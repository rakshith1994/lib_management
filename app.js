import express from 'express';
const app = express();
import os from 'os';
import cluster from 'cluster';
import * as dotenv from 'dotenv'
import bookRouter from './api/books/router.js';
import authorRouter from './api/authors/router.js';
import customerRouter from './api/customers/router.js';
import adminRouter from './api/admin/router.js';
import orderRouter from './api/orders/router.js';
import { signIn, refresh, authorize } from './handler.js';

dotenv.config();
const cpuCount = os.cpus().length;
const workers = [];
app.use(express.json());

app.use('/api',authorize);
app.use('/api/authors',authorRouter);
app.use('/api/books',bookRouter);
app.use('/api/customers',customerRouter);
app.use('/api/admin',adminRouter);
app.use('/api/orders',orderRouter);
app.post('/signIn',signIn);
app.post('/refresh',refresh);

if(cluster.isMaster){
    for(let i=0;i<cpuCount;i++){
        workers.push(cluster.fork());
    };

    cluster.on('online',(worker)=>{
        console.log('Worker started with id '+worker.id);
        worker.on('message',(m)=>{
            console.log('Input received by worker '+ worker.id);
        });
    });

    cluster.on('exit',(worker)=>{
        console.log('Worker exited with id '+worker.id);
        workers.push(cluster.fork());
        workers[workers.length - 1].on('message',(m)=>{
            console.log(m);
        });
    });
}else{

   app.listen(process.env.APP_PORT_NO, ()=>{
        console.log('Listening on port '+process.env.APP_PORT_NO);
   });
}
