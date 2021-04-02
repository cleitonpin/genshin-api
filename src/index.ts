import express from 'express';
import DomainsController from './controllers/DomainsController';
import EnemiesController from './controllers/EnemiesController';
import GadgetsController from './controllers/GadgetController';
import {
    artifactRoutes,
    characterRoutes,
    consumableRoutes,
    materialsRoutes,
    weaponRouter
} from './routes';


const router = express.Router();

const enemiesController = EnemiesController.getInstance();
const domainsController = DomainsController.getInstance();
const gadgetController = GadgetsController.getInstance();

router.use(artifactRoutes);
router.use(characterRoutes);
router.use(materialsRoutes);
router.use(consumableRoutes);
router.use(weaponRouter);

router.get('/domains', domainsController.getDomains);
router.get('/gadgets', gadgetController.getGadgets);
router.get('/enemies', enemiesController.getEnemies);

export { router };
