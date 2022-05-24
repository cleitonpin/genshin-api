import 'express-async-errors'
import 'dotenv/config'
import './database'
import cors from 'cors';
import express from 'express';
import { router } from '.';
import errorMiddleware from './middleware/error.middleware';

const app = express();
// const PORT = process.env.PORT || 8000;
const PORT = 8080;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Oi')
})

app.use('/v1', router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`⚡️ [Server]: running at http://localhost:${PORT}`);
})