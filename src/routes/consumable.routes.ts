import { Router } from 'express';
import ConsumableController from '../controllers/ConsumableController';

const consumableController = ConsumableController.getInstance();
const consumableRoutes = Router();

consumableRoutes.get('/consumable/recipe', consumableController.getRecipe);
consumableRoutes.get('/consumable/recipe/:name', consumableController.getRecipeName);
consumableRoutes.get('/consumable/potions', consumableController.getPotions);

export { consumableRoutes };
