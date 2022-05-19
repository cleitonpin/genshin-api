import { Router } from "express";
import ArtifactController from '../controllers/artifact';

const artifactController = ArtifactController.getInstance();

const artifactRoutes = Router();

artifactRoutes.get('/:language/artifacts', artifactController.getArtifats);
artifactRoutes.get('/:language/artifact/:id', artifactController.getArtifactName);

export default artifactRoutes;