    import {getOrder, addOrder} from './controller.js';
    import express from 'express';
    const app = express();

    app.get('/:id',getOrder);
    app.post('/',addOrder);
    app.get('/:id');
    app.put('/:id');
    app.delete('/:id');

    export default app;