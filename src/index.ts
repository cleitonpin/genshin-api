import express from 'express';
import routes from './routes';
import * as dotenv from 'dotenv';
import errorMiddleware from './middleware/error.middleware'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(routes);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`⚡️ [Server]: running at http://localhost:${PORT}`);
})