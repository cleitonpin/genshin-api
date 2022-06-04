import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import { findOne } from '../util/getFindOne';
import { readFile } from '../util/getPathFile';

interface Tier {
  [key: string]: Array<{
    name: string;
    icon: string;
    designation: string;
    constellation: string;
    vision: string;
  }>;
}
export default class CharacterController {

  private static classInstance?: CharacterController;
  private path: string = 'characters.json'
  private pathTier: string = 'tierlist.json'

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new CharacterController();
    }

    return this.classInstance;
  }

  getCharacters = (req: Request, res: Response) => {
    const vision = req.query.vision as string;
    const { language } = req.params;

    if (vision) {
      try {
        const { characters } = readFile(language, this.path);
        const character: Array<{}> = characters.filter((c: ICharacter) => findOne(c.vision) === findOne(vision));

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

  getCharacterName = (req: Request, res: Response) => {
    try {
      const { id, language } = req.params;
      const { characters } = readFile(language, this.path);

      const character: Array<ICharacter> = characters.filter((c: ICharacter) => c.id === id.toLowerCase());

      if (!character.length) {
        throw new HttpException(404, `No character with ${id} id found.`);
      }

      return res.json(character);
    } catch (err: any) {
      throw new HttpException(500, err);
    }
  }

  getCharacterByElement = (req: Request, res: Response) => {
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

  getTierList = (req: Request, res: Response) => {
    const vision = req.query.vision as string;
    const { language } = req.params;

    if (vision) {

      const tierlist: Tier = readFile(language, this.pathTier);
      const keys = Object.keys(tierlist);

      const data = keys.map((key: string) => {
        const f = tierlist[key].filter((c: any) => c.vision === vision);

        return {
          [key]: f
        }
      })

      const finaldata = data.reduce((acc: any, curr: any) => {
        return {
          ...acc,
          ...curr
        }
      }, {})
      // const tierlistData: Array<{}> = tierlist.filter((c: ICharacter) => findOne(c.vision) === findOne(vision));

      // if (!tierlistData.length) {
      //   throw new HttpException(404, `Characher with vision ${vision} not found`);
      // }

      return res.json(finaldata);

    }

    const data = readFile(language, this.pathTier);
    return res.json(data)
  }
}