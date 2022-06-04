import { Router } from "express";
import WeaponsController from "../controllers/weapons";

const weaponsController = WeaponsController.getInstance();

const weaponRouter = Router();

weaponRouter.get('/:language/weapons', weaponsController.getWeapons);
weaponRouter.get('/:language/weapon', weaponsController.getWeaponsName)

export default weaponRouter;