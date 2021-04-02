import { NextFunction, Request, Response } from 'express';
import { readFile } from '../util/getPathFile';


export default class GadgetController {

    private static classInstance?: GadgetController;
    private path: string = 'gadgets.json';

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new GadgetController();
        }

        return this.classInstance;
    }

    public getGadgets = (req: Request, res: Response, next: NextFunction) => {

        const { language } = req.params
        const gadgets = readFile(language, this.path);

        return res.json(gadgets);
    }
}
