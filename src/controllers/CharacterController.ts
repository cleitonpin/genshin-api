import { Response, Request, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import filePath from '../json/characters.json';
import { findOne } from '../util/getFindOne';

export default class CharacterController {
    
    private static classInstance?: CharacterController;

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new CharacterController();
        }

        return this.classInstance;
    }
    
    public getCharacters = (req: Request, res: Response, next: NextFunction) => {
        const vision = req.query.vision as string;        

        if (vision) {
            try {                            
                const stringJson = JSON.stringify(filePath);
                const { characters } = JSON.parse(stringJson);      

                const character: Array<{}> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(vision));
                
                return character.length === 0 ? 
                    next(new HttpException(404, `No character with ${vision} element found.`)) :
                    res.json(character);
            } catch (err) {
                next(new HttpException(500, err));
            }
        }
        var stringJson = JSON.stringify(filePath);
        var data = JSON.parse(stringJson);

        return res.json(data)
    }

    public getCharacterName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const stringJson = JSON.stringify(filePath);
            const { characters } = JSON.parse(stringJson);
            
            const character: Array<{}> = characters.filter((c: ICharacter) => c.id === id.toLowerCase());
            
            return character.length === 0 ? 
                next(new HttpException(404, `No weapon with ${id} id found.`)) :
                res.json(character);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getCharacterByElement = (req: Request, res: Response, next: NextFunction) => {
        try {
            
            const { element } = req.params;
            const stringJson = JSON.stringify(filePath);
            const { characters } = JSON.parse(stringJson);
            
            const character: Array<{}> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(element));
            
            
            return character.length === 0 ? 
                next(new HttpException(404, `No weapon with ${element} element found.`)) :
                res.json(character);
        } catch (err) {
            next(new HttpException(500, err));
        }
    }
    
}