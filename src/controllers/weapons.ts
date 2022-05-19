import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { IWeapon } from '../interfaces';
import { findOne } from '../util/getFindOne';
import { readFile } from '../util/getPathFile';

export default class WeaponsController {

  private static classInstance?: WeaponsController;
  private path: string = 'weapons.json'

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new WeaponsController();
    }

    return this.classInstance;
  }

  public getWeapons = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { language } = req.params
      var data = readFile(language, this.path)

      return res.json(data)
    } catch (err: any) {
      throw new HttpException(404, err.message)
    }
  }

  public getWeaponsName = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, language } = req.params;
      const { weapons } = readFile(language, this.path)

      if (weapons) {
        const weapon: Array<{}> = weapons.filter((w: IWeapon) => findOne(w.name) === findOne(name));

        if (!weapon.length) {
          throw new HttpException(404, `No weapon with ${name} name found.`);
        }

        return res.json(weapon);
      }

      throw new HttpException(500, 'This language not supported');
    } catch (err: any) {
      throw new HttpException(500, err.message);
    }
  }
}