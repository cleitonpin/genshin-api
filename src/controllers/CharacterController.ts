import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import { findOne } from '../util/getFindOne';
import { readFile } from '../util/getPathFile';

export default class CharacterController {

    private static classInstance?: CharacterController;
    private path: string = 'characters.json'

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new CharacterController();
        }

        return this.classInstance;
    }

    public getCharacters = (req: Request, res: Response, next: NextFunction) => {
        const vision = req.query.vision as string;
        const { language } = req.params;

        if (vision) {
            try {
                const { characters } = readFile(language, this.path);

                const character: Array<{}> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(vision));

                return character.length === 0 ?
                    next(new HttpException(404, `No character with ${vision} element found.`)) :
                    res.json(character);
            } catch (err) {
                next(new HttpException(500, err));
            }
        }
        const data = readFile(language, this.path);

        return res.json(data)
    }

    public getCharacterName = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, language } = req.params;
            const { characters } = readFile(language, this.path);

            if (characters) {
                const character: Array<ICharacter> = characters && characters.filter((c: ICharacter) => c.id === id.toLowerCase());

                return character.length === 0 ?
                    next(new HttpException(404, `No weapon with ${id} id found.`)) :
                    res.json(character);
            }

            return res.json({
                message: 'This language not supported'
            })
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

    public getCharacterByElement = (req: Request, res: Response, next: NextFunction) => {
        try {

            const { element, language } = req.params;
            const { characters } = readFile(language, this.path);

            if (characters) {
                const character: Array<ICharacter> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(element));

                return character.length === 0 ?
                    next(new HttpException(404, `No weapon with ${element} element found.`)) :
                    res.json(character);
            }

            next(new HttpException(500, 'This language not supported'));
        } catch (err) {
            next(new HttpException(500, err));
        }
    }

}