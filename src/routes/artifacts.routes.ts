import { Router } from "express";
import ArtifactController from '../controllers/ArtifactController';

const artifactController = ArtifactController.getInstance();

const artifactRoutes = Router();

artifactRoutes.get('/:language/artifact', artifactController.getArtifats);
artifactRoutes.get('/:language/artifact/:id', artifactController.getArtifactName);

export default artifactRoutes;