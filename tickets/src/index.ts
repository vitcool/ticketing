import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@vkticketing/common';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true
}));

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY should be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI should be defined');
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to the MongoDB')
  } catch (e) {
    console.error(e);
  }

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
};

start();