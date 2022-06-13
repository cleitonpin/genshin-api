import { IUser } from "../models/User";
import { IUserService } from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class MockUserService implements IUserService {
	private users: IUser[] = []

	public async create(user: IUser): Promise<void> {
		this.users.push(user)
	}
	// getUser x
	// getUsers x
	// create x
	// login x 
	// comparePassword  x
	// generateToken x
	// update x
	public async getUsers(): Promise<IUser[]> {
		return this.users
	}

	public async getUser(id: string): Promise<IUser | null> {
		const user = this.users.find(u => u._id == id) ?? null

		return user
	}

	public async update(id: string, user: IUser): Promise<void> {
		const index = this.users.findIndex(u => u._id === id)
		this.users[index] = user
	}

	public async login(email: string, password: string): Promise<IUser | null> {
		const user = this.users.find(u => u.email === email)
		if (!user) return null
		const isMatch = await this.comparePassword(password, user.password ?? '')
		if (!isMatch) return null
		delete user.password
		return user
	}

	public async comparePassword(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash)
	}

	public generateToken(id: string): string {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: '7d' // process.env.JWT_EXPIRES_IN
		})
	}
}

export { MockUserService }