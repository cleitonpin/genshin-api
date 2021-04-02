import { Router } from 'express';
import MaterialsController from '../controllers/MaterialsController';

const materialController = MaterialsController.getInstance();
const materialsRoutes = Router();

materialsRoutes.get('/materials/', materialController.getMaterials);
materialsRoutes.get('/materials/character-ascension', materialController.getMaterialCharacterAscension);
materialsRoutes.get('/materials/character-experience', materialController.getMaterialCharacterExperience);
materialsRoutes.get('/materials/common-ascension', materialController.getMaterialCommonAscension);
materialsRoutes.get('/materials/local-specialties', materialController.getMaterialLocalSpecialties);
materialsRoutes.get('/materials/talent-book', materialController.getMaterialTalentBook);
materialsRoutes.get('/materials/talent-boss', materialController.getMaterialTalentBoss);
materialsRoutes.get('/materials/weapon-ascension', materialController.getMaterialWeaponAscension);
materialsRoutes.get('/materials/weapon-experience', materialController.getMaterialWeaponExperience);

export { materialsRoutes };
