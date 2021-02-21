import { Response, Request, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import filePath from '../json/potions.json'
import { findJoin } from '../util/getFindOne';
import { readdirSync } from 'fs';
import { join } from 'path';

export default class RecipeController {
    
    private static classInstance?: RecipeController;

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new RecipeController();
        }

        return this.classInstance;
    }

    public getRecipe = (req: Request, res: Response, next: NextFunction) => {
        try {
            const recipesDir = join(__dirname, "..", ".", "json", "recipes");
            const recipeFiles = readdirSync(recipesDir).filter(file => file.endsWith('.json'));
            const data: Array<{}> = [];

            for (let file = 0; file < recipeFiles.length; file++) {
                const recipes = require(`../json/recipes/${recipeFiles[file]}`);
                data.push(recipes);
            }

            return res.json(data);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getRecipeName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;
            const recipe: object = this.getJSON(findJoin(name));

            return recipe === undefined ? 
                next(new HttpException(404, `No recipe with name ${name} found.`)) :
                res.json(recipe);
        } catch (error) {
            
        }
    }

    public getPotions = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const potions = JSON.parse(stringJson);
            
            return res.json(potions);
        } catch (error) {
            
        }
    }

    private getJSON(recipe: string) {
        try {
            return require(`../json/recipes/${recipe}.json`)
        } catch (e) {
            return undefined;
        }
    }
    
}
