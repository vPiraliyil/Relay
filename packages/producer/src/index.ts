import express from 'express';
import { config } from './config';
import { uploadRouter } from './routes/upload';
import { adminRouter } from './routes/admin';

const app = express();

app.use(express.json());

// Routes
app.use('/upload', uploadRouter);
app.use('/admin', adminRouter);

// TODO: start the Express server on config.port
