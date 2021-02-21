import { Response, Request, NextFunction } from 'express';
import filePath from '../json/domains.json';
// import { IArtifact } from '../interfaces';
import HttpException from '../exceptions/HttpException';

export default class DomainsController {
    
    private static classInstance?: DomainsController;


    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new DomainsController();
        }

        return this.classInstance;
    }
    
    public getDomains = (req: Request, res: Response) => {
        var stringJson = JSON.stringify(filePath);
        var data = JSON.parse(stringJson);

        return res.json(data)
    }

}