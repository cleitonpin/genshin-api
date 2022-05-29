import { IUser, User } from '../models/User'
import bcrypt from 'bcryptjs'
import HttpException from '../exceptions/HttpException';

interface IUserService {
  getUser(id: number): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
  create(user: IUser): Promise<void>;
  login(email: string, password: string): Promise<IUser | null>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

class UserService implements IUserService {
  public async getUser(id: number): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  public async create({ email, password, username }: IUser): Promise<void> {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) throw new HttpException(400, 'User already exists');

    const newUser = await User.create({
      email,
      password,
      username
    })

    if (!newUser) throw new HttpException(400, 'User not created');
  }

  public async login(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email }).lean();
    if (!user) return null;

    const isMatch = await this.comparePassword(password, user.password!);
    if (!isMatch) return null;

    delete user.password

    return user;
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export { UserService };