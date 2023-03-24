import mongoose from 'mongoose'
import { User, UsersModelFullType, UserDocument } from './user.entity.type'
import bcrypt from 'bcrypt'
import { Token } from '../../../global-types/token.type'

export const UsersSchema = new mongoose.Schema<User>({
    login: { type: String, required: true, maxlength: 50, minlength: 3 },
    hash: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: String, required: true },
    refreshToken: { type: String }
})

UsersSchema.statics.make = function (login: string, email: string, password: string) {
    const passwordSalt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)
    const newDate = new Date()
    return new UsersModel({
        login: login,
        hash: passwordHash,
        email: email,
        createdAt: newDate.toISOString(),
        refreshToken: null
    })
}

UsersSchema.methods.updateRefreshToken = function (refreshToken: Token): boolean {
    this.refreshToken = refreshToken
    return true
}

UsersSchema.methods.deleteRefreshToken = function (): boolean {
    this.refreshToken = null
    return true
}

export const UsersModel = mongoose.model<UserDocument, UsersModelFullType>('users', UsersSchema)
