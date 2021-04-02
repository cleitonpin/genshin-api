import express from 'express';
import DomainsController from './controllers/DomainsController';
import EnemiesController from './controllers/EnemiesController';
import GadgetsController from './controllers/GadgetController';
// routes extensions
import { artifactRoutes } from './routes/artifacts.routes';
import { characterRoutes } from './routes/character.routes';
import { consumableRoutes } from './routes/consumable.routes';
import { materialsRoutes } from './routes/materials.routes';
import { weaponRouter } from './routes/weapons.routes';

const routes = express.Router();

const enemiesController = EnemiesController.getInstance();
const domainsController = DomainsController.getInstance();
const gadgetController = GadgetsController.getInstance();

routes.use(artifactRoutes);
routes.use(characterRoutes);
routes.use(materialsRoutes);
routes.use(consumableRoutes);
routes.use(weaponRouter);

routes.get('/domains', domainsController.getDomains);
routes.get('/gadgets', gadgetController.getGadgets);
routes.get('/enemies', enemiesController.getEnemies);

export { routes };

