import mongoose from 'mongoose'
import { News, NewsDocument, NewsModelFullType } from './news.entity.type'

export const NewsSchema = new mongoose.Schema<News>({
    title: { type: String, required: true, maxlength: 100, minlength: 3 },
    description: { type: String, maxlength: 200, required: true },
    content: { type: String, maxlength: 1000, required: true },
    createdAt: { type: String, required: true },
    published: { type: Boolean, required: true },
    isDeleted: { type: Boolean, required: true },
    static_img: { type: String }
})

NewsSchema.statics.make = function (title: string, description: string, content: string) {
    const newDate = new Date()
    return new NewsModel({
        title: title,
        description: description,
        content: content,
        createdAt: newDate.toISOString(),
        published: false,
        isDeleted: false,
        static_img: '/img'
    })
}

NewsSchema.methods.update = function (title: string, description: string, content: string): boolean {
    this.title = title
    this.description = description
    this.content = content
    return true
}

NewsSchema.methods.publish = function (status: boolean): boolean {
    this.published = status
    return true
}

export const NewsModel = mongoose.model<NewsDocument, NewsModelFullType>('news', NewsSchema)
