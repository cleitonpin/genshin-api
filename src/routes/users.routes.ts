import { Router } from 'express';
import UserController from '../controllers/user';
import authMiddleware from '../middleware/authentication';

const userRoutes = Router();

userRoutes.post('/user', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.put('/user/:id', authMiddleware, UserController.update);

export default userRoutes;