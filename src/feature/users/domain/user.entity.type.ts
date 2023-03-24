import { Model, Types, HydratedDocument } from 'mongoose'
import { Token } from '../../../global-types/token.type'

export type User = {
    login: string
    hash: string
    email: string
    createdAt: string
    refreshToken: Token
}
export type UserDocument = HydratedDocument<User> & UsersMethods

type UsersStatics = {
    make: (login: string, password: string, email: string) => UserDocument
}

export type UsersMethods = {
    updateRefreshToken: (refreshToken: Token) => boolean
    deleteRefreshToken: () => boolean
}

export type UsersModelFullType = Model<UserDocument> & UsersStatics & { _id: Types.ObjectId }
