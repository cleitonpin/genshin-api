import { Router } from 'express';
import ConsumableController from '../controllers/ConsumableController';

const consumableController = ConsumableController.getInstance();
const consumableRoutes = Router();

consumableRoutes.get('/:language/consumable/recipe', consumableController.getRecipe);
consumableRoutes.get('/:language/consumable/recipe/:name', consumableController.getRecipeName);
consumableRoutes.get('/:language/consumable/potions', consumableController.getPotions);

export default consumableRoutes;