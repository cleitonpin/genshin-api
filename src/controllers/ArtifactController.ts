import { Response, Request, NextFunction } from 'express';
import filePath from '../json/artifacts.json';
import { IArtifact } from '../interfaces';
import HttpException from '../exceptions/HttpException';

export default class ArtifactController {
    
    private static classInstance?: ArtifactController;


    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new ArtifactController();
        }

        return this.classInstance;
    }
    
    /**
     * 
     * @param req 
     * @param res 
     */
    public getArtifats = (req: Request, res: Response) => {
        var stringJson = JSON.stringify(filePath);
        var data = JSON.parse(stringJson);

        return res.json(data)
    }

    /**
     * Returns information for an artifact
     * @param {req} Request
     * @param {res} Response
     * @param {next} Next
     * 
     * @returns {Array<Object>}
     */
    public getArtifactName = (req: Request, res: Response, next: NextFunction): any => {
        try {
            const { id } = req.params;
            const stringJson = JSON.stringify(filePath);
            const { artifacts } = JSON.parse(stringJson);
            
            const artifact: Array<{}> = artifacts.filter((c: IArtifact) => c.id === id.toLowerCase());
            
            return artifact.length === 0 ? 
                next(new HttpException(404, `No weapon with ${id} id found.`)) : 
                res.json(artifact);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
}