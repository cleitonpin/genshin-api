import { NextFunction, Request, Response } from 'express';
import HttpException from '../errors/HttpException';
import { IEnemies } from '../interfaces';
import { readFile } from '../util/getPathFile';

export default class EnemiesController {

	private static classInstance?: EnemiesController;
	private path: string = 'enemies.json'

	public static getInstance() {
		if (!this.classInstance) {
			this.classInstance = new EnemiesController();
		}

		return this.classInstance;
	}

	public getEnemies = (req: Request, res: Response, next: NextFunction) => {
		try {
			const { language } = req.params
			const enemies: IEnemies = readFile(language, this.path)

			return res.json(enemies);
		} catch (err: any) {
			throw new HttpException(500, err.message);
		}
	}
}
