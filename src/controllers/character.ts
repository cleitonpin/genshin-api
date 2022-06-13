import { Request, Response } from 'express';
import HttpException from '../errors/HttpException';
import { ICharacter } from '../interfaces';
import { Character } from '../models/Character';
import { getRedis, setRedis } from '../redisConfig';
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

	getCharacters = async (req: Request, res: Response) => {
		const vision = req.query.vision as string;
		const dataRedis = await getRedis("characters");

		if (dataRedis && !vision) {
			return res.json({ characters: JSON.parse(dataRedis) });
		}

		const filter = vision ? { vision } : {};
		const characters = await Character.find(filter).lean();

		if (!dataRedis) await setRedis("characters", JSON.stringify(characters));

		return res.json({ characters });
	}

	getCharacterName = async (req: Request, res: Response) => {
		const { id } = req.params;
		const character = await Character.findOne({ name: id }).lean();

		return res.json(character);
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