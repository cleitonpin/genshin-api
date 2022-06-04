import { Router } from 'express';
import CharacterController from '../controllers/character';

const characterController = CharacterController.getInstance();

const characterRoutes = Router();

characterRoutes.get('/:language/characters', characterController.getCharacters);
characterRoutes.get('/:language/tierlist', characterController.getTierList);
characterRoutes.get('/:language/character/:id', characterController.getCharacterName);
characterRoutes.get('/:language/character/element/:element', characterController.getCharacterByElement);

export default characterRoutes;