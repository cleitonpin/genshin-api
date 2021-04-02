import cors from 'cors';
import express from 'express';
import errorMiddleware from './middleware/error.middleware';
import { routes } from './routes';

class App {
    constructor(
        private client: express.Express,
        protected PORT = process.env.PORT || 3000
    ) {
        this.middlewares();
    }

    middlewares() {
        this.client.use(express.json())
        this.client.use(routes)
        this.client.use(cors())
        this.client.use(errorMiddleware)
    }

    router() {

    }

    init() {
        this.client.listen(this.PORT)
    }
}