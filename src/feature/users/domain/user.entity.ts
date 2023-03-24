import mongoose from 'mongoose'
import { UsersModelFullType, UsersModelType } from './user.entity.type'
import bcrypt from 'bcrypt'

export const UsersSchema = new mongoose.Schema<UsersModelType>({
    login: { type: String, required: true, maxlength: 50, minlength: 3 },
    hash: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: String, required: true }
})

UsersSchema.statics.make = function (login: string, email: string, password: string) {
    const passwordSalt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)
    const newDate = new Date()
    return new UsersModel({
        login: login,
        hash: passwordHash,
        email: email,
        createdAt: newDate.toISOString()
    })
}

export const UsersModel = mongoose.model<UsersModelType, UsersModelFullType>('users', UsersSchema)
