import { Model, Types, HydratedDocument } from 'mongoose'

export type News = {
    title: string
    description: string
    content: string
    createdAt: string
    published: boolean
    isDeleted: boolean
    userId: string
    fileName: string
}
export type NewsDocument = HydratedDocument<News> & NewsMethods

type NewsStatics = {
    make: (title: string, description: string, content: string, userId: string, fileName?: string) => NewsDocument
}

export type NewsMethods = {
    update: (title: string, description: string, content: string) => boolean
    delete: () => boolean
    publish: (status: boolean) => boolean
    isOwner: (userId: string) => boolean
}

export type NewsModelFullType = Model<NewsDocument> & NewsStatics & { _id: Types.ObjectId }
