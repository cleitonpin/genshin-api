import { NextFunction, Request, Response } from 'express';
// import { IArtifact } from '../interfaces';
import HttpException from '../errors/HttpException';
import { readFile } from '../util/getPathFile';

export default class MaterialsController {

	private static classInstance?: MaterialsController;
	private path: string = 'materials.json'

	public static getInstance() {
		if (!this.classInstance) {
			this.classInstance = new MaterialsController();
		}

		return this.classInstance;
	}

	public getMaterials = (req: Request, res: Response) => {
		const { language } = req.params
		var data = readFile(language, this.path)

		return res.json(data)
	}

	public getMaterialNames = (req: Request, res: Response, next: NextFunction) => {
		try {
			const { language, material } = req.params
			const { materials } = readFile(language, this.path)

			if (material) {
				return res.json(materials[material]);
			}

			throw new HttpException(404, 'Not material with name found');
		} catch (err: any) {
			throw new HttpException(500, err.message);
		}
	}
}