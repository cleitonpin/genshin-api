import { Router } from 'express';
import MaterialsController from '../controllers/materials';

const materialController = MaterialsController.getInstance();
const materialsRoutes = Router();

materialsRoutes.get('/:language/materials/', materialController.getMaterials);
materialsRoutes.get('/:language/materials/:material', materialController.getMaterialNames);

export default materialsRoutes;