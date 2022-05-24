import { Router } from 'express';
import UserController from '../controllers/user';

const userRoutes = Router();

userRoutes.post('/user', UserController.create);
userRoutes.post('/login', UserController.login);

export default userRoutes;