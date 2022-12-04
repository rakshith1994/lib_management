import {fetchUser, addUser} from './controller.js';
import express from 'express';
const app = express();

app.get('/:email',fetchUser);
app.post('/',addUser);

export default app;