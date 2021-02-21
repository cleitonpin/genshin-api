import { Response, Request, NextFunction } from 'express';
import filePath from '../json/weapons.json';
import { IWeapon } from '../interfaces';
import { findOne } from '../util/getFindOne'
import HttpException from '../exceptions/HttpException';

export default class WeaponsController {
    
    private static classInstance?: WeaponsController;


    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new WeaponsController();
        }

        return this.classInstance;
    }
    
    public getWeapons = (req: Request, res: Response, next: NextFunction) => {
        try {
            var stringJson = JSON.stringify(filePath);
            var data = JSON.parse(stringJson);
    
            return res.json(data)
        } catch (err) {
            next(new HttpException(404, err))
        }
    }

    public getWeaponsName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;
            const stringJson = JSON.stringify(filePath);
            const { weapons } = JSON.parse(stringJson);
            
            const weapon: Array<{}> = weapons.filter((w: IWeapon) => findOne(w.name) === findOne(name));

            return weapon.length === 0 ? 
                next(new HttpException(404, `No weapon with ${name} name found.`)) :
                res.json(weapon);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
}