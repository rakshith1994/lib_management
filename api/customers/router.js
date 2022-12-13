    import {getUser, addUser, getAllCustomers} from './controller.js';
    import express from 'express';
    const app = express();

    app.get('/:id',getUser);
    app.get('/',getAllCustomers);
    app.post('/',addUser);
    app.put('/:id');
    app.delete('/:id');

    export default app;