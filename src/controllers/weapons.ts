import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';
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
			const { type } = req.query;
			const { weapons } = readFile(language, this.path)
			console.log(type)
			if (type) {
				const weapon: Array<{}> = weapons.filter((w: IWeapon) => w.type === type);
				console.log(type)
				if (!weapon.length) {
					throw new HttpException(404, `No weapon with ${type} name found.`);
				}

				return res.json(weapon);
			}


			return res.json(weapons)
		} catch (err: any) {
			throw new HttpException(404, err.message)
		}
	}

	public getWeaponsName = (req: Request, res: Response, next: NextFunction) => {
		try {
			const { language } = req.params;
			const { type } = req.query;
			const { weapons } = readFile(language, this.path)

			if (weapons) {
				const weapon: Array<{}> = weapons.filter((w: IWeapon) => w.type === type);
				console.log(type)
				if (!weapon.length) {
					throw new HttpException(404, `No weapon with ${type} name found.`);
				}

				return res.json(weapon);
			}

			throw new HttpException(500, 'This language not supported');
		} catch (err: any) {
			throw new HttpException(500, err.message);
		}
	}
}