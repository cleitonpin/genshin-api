import { Request, Response } from 'express';
import { readFile } from '../util/getPathFile';

export default class DomainsController {

  private static classInstance?: DomainsController;
  private path: string = 'domains.json'

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new DomainsController();
    }

    return this.classInstance;
  }

  public getDomains = (req: Request, res: Response) => {
    const { language } = req.params
    const data = readFile(language, this.path);

    return res.json(data)
  }

}