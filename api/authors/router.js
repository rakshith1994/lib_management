    import {getAuthor, addAuthor, addAuthors} from './controller.js';
    import express from 'express';
    const app = express();

    app.get('/:name',getAuthor);
    app.post('/',addAuthor);
    app.post('/bulk',addAuthors);
    app.put('/:id');
    app.delete('/:id');

    export default app;