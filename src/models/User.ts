import mongoose, { model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  _id: string;
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
