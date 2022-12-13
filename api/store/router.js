import {getOrdersByUserId} from './controller.js';
import express from 'express';
const app = express();

app.get('/:id',getOrdersByUserId);


export default app;