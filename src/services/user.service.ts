import { IUser, User } from '../models/User'
import bcrypt from 'bcryptjs'

interface IUserService {
  getUser(id: number): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
  createUser(user: IUser): Promise<IUser>;
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

  public async createUser(user: IUser): Promise<IUser> {
    return await User.create(user);
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