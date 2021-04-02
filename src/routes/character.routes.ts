import { Router } from 'express';
import CharacterController from '../controllers/CharacterController';

const characterController = CharacterController.getInstance();

const characterRoutes = Router();

characterRoutes.get('/character', characterController.getCharacters);
characterRoutes.get('/character/:id', characterController.getCharacterName);
characterRoutes.get('/character/element/:element', characterController.getCharacterByElement);

export { characterRoutes };
