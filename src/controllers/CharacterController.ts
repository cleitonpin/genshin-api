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
    console.log(vision)
    if (vision) {
      try {
        const { characters } = readFile(language, this.path);
        const character: Array<{}> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(vision));
        //GENSHIN/Characters/Albedo.png

        if (!character.length) {
          throw new HttpException(404, `Characher with vision ${vision} not found`);
        }

        return res.json({ characters: character });
      } catch (err: any) {
        throw new HttpException(500, err.message);
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
    } catch (err: any) {
      throw new HttpException(500, err);
    }
  }

  public getCharacterByElement = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { element, language } = req.params;
      const { characters } = readFile(language, this.path);

      if (characters) {
        const character: Array<ICharacter> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(element));

        if (!character.length) {
          throw new HttpException(404, `No character with ${element} element found.`);
        }

        return res.json(character);
      }

      throw new HttpException(500, 'This language not supported')
    } catch (err: any) {
      throw new HttpException(500, err);
    }
  }
}