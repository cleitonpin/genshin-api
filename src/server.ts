import 'express-async-errors'
import 'dotenv/config'
import './config/database'
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { router } from '.';
import errorMiddleware from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
	return res.send('Oi')
})

app.use('/v1', router);
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`⚡️ [Server]: running at http://localhost:${PORT}`);
})