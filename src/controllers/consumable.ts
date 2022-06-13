import { NextFunction, Request, Response } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import HttpException from '../errors/HttpException';
import { IRecipes } from '../interfaces';
import { findJoin } from '../util/getFindOne';
import { readFile } from '../util/getPathFile';

export default class RecipeController {

	private static classInstance?: RecipeController;
	private path: string = 'potions.json'

	public static getInstance() {
		if (!this.classInstance) {
			this.classInstance = new RecipeController();
		}

		return this.classInstance;
	}

	public getRecipe = (req: Request, res: Response, next: NextFunction) => {
		try {
			try {
				const { language } = req.params;
				const recipesDir = join(__dirname, "..", ".", "json", language, "recipes");
				const recipeFiles = readdirSync(recipesDir).filter(file => file.endsWith('.json'));
				const data: Array<{}> = [];

				for (let file = 0; file < recipeFiles.length; file++) {
					const recipes = require(`../json/${language}/recipes/${recipeFiles[file]}`);
					data.push(recipes);
				}

				return res.json(data);
			} catch (e) {
				return res.json({
					message: 'This language not supported'
				})
			}
		} catch (err: any) {
			throw new HttpException(500, err);
		}
	}

	public getRecipeName = (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, language } = req.params;
			const recipe: IRecipes = this.getJSON(findJoin(name), language);

			if (!recipe) {
				throw new HttpException(404, `No recipe with ${name} name found.`);
			}

			return res.json(recipe);
		} catch (error: any) {
			throw new HttpException(500, error.message);
		}
	}

	public getPotions = (req: Request, res: Response, next: NextFunction) => {
		const { language } = req.params;
		const potions = readFile(language, this.path);

		return res.json(potions);
	}

	private getJSON(recipe: string, language: string) {
		try {
			return require(`../json/${language}/recipes/${recipe}.json`)
		} catch (e) {
			return undefined;
		}
	}

}
