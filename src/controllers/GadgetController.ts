import { Response, Request, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { ICharacter } from '../interfaces';
import filePath from '../json/gadgets.json'


export default class GadgetController {
    
    private static classInstance?: GadgetController;

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new GadgetController();
        }

        return this.classInstance;
    }

    public getGadgets = (req: Request, res: Response, next: NextFunction) => {
        try {
            const stringJson = JSON.stringify(filePath);
            const gadgets = JSON.parse(stringJson);
            
            return res.json(gadgets);
        } catch (error) {
            
        }
    }

    
}
