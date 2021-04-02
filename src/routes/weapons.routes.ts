import { Router } from "express";
import WeaponsController from "../controllers/WeaponsController";

const weaponsController = WeaponsController.getInstance();

const weaponRouter = Router();

weaponRouter.get('/weapons', weaponsController.getWeapons);
weaponRouter.get('/weapon/:name', weaponsController.getWeaponsName)

export default weaponRouter;
