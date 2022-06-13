import { Router } from 'express';
import CharacterController from '../controllers/character';
import authMiddleware from '../middleware/authentication';

const characterController = CharacterController.getInstance();

const characterRoutes = Router();

characterRoutes.get('/:language/characters', characterController.getCharacters);
characterRoutes.get('/:language/tierlist', characterController.getTierList);
characterRoutes.get('/:language/character/:id', characterController.getCharacterName);

export default characterRoutes;