import { Router } from "express";
import ArtifactController from '../controllers/ArtifactController';

const artifactController = ArtifactController.getInstance();

const artifactRoutes = Router();

artifactRoutes.get('/artifact', artifactController.getArtifats);
artifactRoutes.get('/artifact/:id', artifactController.getArtifactName);

export { artifactRoutes };
