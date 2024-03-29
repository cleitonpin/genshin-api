import mongoose, { model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
	_id?: string;
	email: string;
	password?: string;
	img_url: string;
	createdAt?: Date;
	username: string;
}

const UserSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
	},
	img_url: {
		type: String,
		required: false,
		default: 'data:image/jpeg;base64,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'
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
})

UserSchema.pre('save', function (next) {
	const user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password ?? '', salt, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})


export const User = model<IUser>('User', UserSchema)
