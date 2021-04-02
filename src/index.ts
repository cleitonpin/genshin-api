import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import errorMiddleware from './middleware/error.middleware';
import { routes } from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(errorMiddleware);
app.use(routes);

app.listen(PORT, () => {
    console.log(`⚡️ [Server]: running at http://localhost:${PORT}`);
})