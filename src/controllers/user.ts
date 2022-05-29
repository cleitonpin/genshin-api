import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {

  async create(req: Request, res: Response) {
    const userService = new UserService()
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const userService = new UserService()
    const user = await userService.login(req.body.email, req.body.password);

    if (!user) return res.status(401).json({ message: "Usuário ou senha inválidos" });

    return res.json(user);
  }
}

export default new UserController();