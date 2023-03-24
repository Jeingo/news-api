import { Model, Document, Types } from 'mongoose'

type Users = {
    login: string
    hash: string
    email: string
    createdAt: string
}

type UsersStatics = {
    make: (login: string, password: string, email: string) => UsersModelFullType
}

export type UsersModelType = Users & Document

export type UsersModelFullType = Model<UsersModelType> & UsersStatics & { _id: Types.ObjectId }
