import { Response, Request, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import filePath from '../json/enemies.json'


export default class EnemiesController {
    
    private static classInstance?: EnemiesController;

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new EnemiesController();
        }

        return this.classInstance;
    }

    public getEnemies = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const enemies = JSON.parse(stringJson);
            
            return res.json(enemies);
        } catch (error) {
            
        }
    }
}
