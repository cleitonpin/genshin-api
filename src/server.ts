import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { router } from '.';
import errorMiddleware from './middleware/error.middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use('/v1', router);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`⚡️ [Server]: running at http://localhost:${PORT}`);
})