    import express from 'express';
    import {getbook, addBook, addBooks, modifyBooks} from "./controller.js";
    const app = express();

    app.get('/:name',getbook);
    app.post('/',addBook);
    app.post('/bulk',addBooks);
    app.get('/:id');
    app.put('/',modifyBooks);
    app.delete('/:id');

    export default app;