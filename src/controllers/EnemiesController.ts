import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IEnemies } from '../interfaces';
import filePath from '../json/enemies.json';

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
            const enemies: IEnemies = JSON.parse(stringJson);

            return res.json(enemies);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
}
