import { Router } from 'express';
import CharacterController from '../controllers/CharacterController';

const characterController = CharacterController.getInstance();

const characterRoutes = Router();

characterRoutes.get('/:language/character', characterController.getCharacters);
characterRoutes.get('/:language/character/:id', characterController.getCharacterName);
characterRoutes.get('/:language/character/element/:element', characterController.getCharacterByElement);

export default characterRoutes;