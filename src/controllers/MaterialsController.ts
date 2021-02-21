import { Response, Request, NextFunction } from 'express';
import filePath from '../json/materials.json';
// import { IArtifact } from '../interfaces';
import HttpException from '../exceptions/HttpException';

export default class MaterialsController {
    
    private static classInstance?: MaterialsController;


    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new MaterialsController();
        }

        return this.classInstance;
    }
    
    public getMaterials = (req: Request, res: Response) => {
        var stringJson = JSON.stringify(filePath);
        var data = JSON.parse(stringJson);

        return res.json(data)
    }

    public getMaterialCharacterAscension = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['character-ascension']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialCharacterExperience = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['character-experience']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialCommonAscension = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['common-ascension']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialLocalSpecialties = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['local-specialties']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialTalentBook = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['talent-book']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialTalentBoss = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['talent-boss']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialWeaponAscension = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['weapon-ascension']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getMaterialWeaponExperience = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const { materials } = JSON.parse(stringJson);

            return res.json(materials['weapon-experience']);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
}