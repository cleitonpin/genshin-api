import express from 'express';

const routes = express.Router();

import CharacterController from './controllers/CharacterController';
import ArtifactController from './controllers/ArtifactController';
import WeaponsController from './controllers/WeaponsController';
import MaterialsController from './controllers/MaterialsController';
import DomainsController from './controllers/DomainsController';
import ConsumableController from './controllers/ConsumableController';
import GadgetsController from './controllers/GadgetController';

const characterController = CharacterController.getInstance();
const artifactController = ArtifactController.getInstance();
const weaponsController = WeaponsController.getInstance();
const materialController = MaterialsController.getInstance();
const domainsController = DomainsController.getInstance();
const consumableController = ConsumableController.getInstance();
const gadgetController = GadgetsController.getInstance();

routes.get('/character', characterController.getCharacters);
routes.get('/character/:id', characterController.getCharacterName);
routes.get('/character/element/:element', characterController.getCharacterByElement);

routes.get('/artifact', artifactController.getArtifats);
routes.get('/artifact/:id', artifactController.getArtifactName)

routes.get('/weapons', weaponsController.getWeapons);
routes.get('/weapon/:name', weaponsController.getWeaponsName)

routes.get('/materials/', materialController.getMaterials);
routes.get('/materials/character-ascension', materialController.getMaterialCharacterAscension);
routes.get('/materials/character-experience', materialController.getMaterialCharacterExperience);
routes.get('/materials/common-ascension', materialController.getMaterialCommonAscension);
routes.get('/materials/local-specialties', materialController.getMaterialLocalSpecialties);
routes.get('/materials/talent-book', materialController.getMaterialTalentBook);
routes.get('/materials/talent-boss', materialController.getMaterialTalentBoss);
routes.get('/materials/weapon-ascension', materialController.getMaterialWeaponAscension);
routes.get('/materials/weapon-experience', materialController.getMaterialWeaponExperience);

routes.get('/domains', domainsController.getDomains);

routes.get('/consumable/recipe', consumableController.getRecipe);
routes.get('/consumable/recipe/:name', consumableController.getRecipeName);
routes.get('/consumable/potions', consumableController.getPotions);

routes.get('/gadgets', gadgetController.getGadgets);

export default routes;