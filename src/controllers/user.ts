import { Request, Response } from "express";
import { IUserService, UserService } from "../services/user.service";

class UserController {

  constructor(private userService: IUserService) { }

  create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  }

  login = async (req: Request, res: Response) => {
    const user = await this.userService.login(req.body.email, req.body.password);

    if (!user) return res.status(401).json({ message: "Usuário ou senha inválidos" });

    return res.json({
      user,
      token: this.userService.generateToken(user._id)
    });
  }

  update = async (req: Request, res: Response) => {
    await this.userService.update(req.userId, req.body);

    return res.sendStatus(200);
  }
}

export default new UserController(new UserService());