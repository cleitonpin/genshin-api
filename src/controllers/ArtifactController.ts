import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IArtifact } from '../interfaces';
import { readFile } from '../util/getPathFile';

export default class ArtifactController {

    private static classInstance?: ArtifactController;
    private path: string = 'artifacts.json'

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new ArtifactController();
        }

        return this.classInstance;
    }

    public getArtifats = (req: Request, res: Response) => {
        const { language } = req.params;
        const data: Array<IArtifact> = readFile(language, this.path)

        return res.json(data)
    }

    public getArtifactName = (req: Request, res: Response, next: NextFunction): any => {
        try {
            const { id, language } = req.params;
            const { artifacts } = readFile(language, this.path);

            const artifact: Array<{}> = artifacts.filter((a: IArtifact) => a.id === id.toLowerCase());

            return artifact.length === 0 ?
                next(new HttpException(404, `No artifact with ${id} id found.`)) :
                res.json(artifact);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
}