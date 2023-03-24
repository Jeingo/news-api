import { DbId } from '../../../global-types/db.types'
import { OutputNewsModel } from '../api/controller/models/output.news.model'
import { NewsModel } from '../domain/news.entity'
import { ObjectId } from 'mongodb'
import { NewsDocument } from '../domain/news.entity.type'

class NewsQueryRepository {
    async getNewsById(id: DbId): Promise<OutputNewsModel | null> {
        const result = await NewsModel.findById(new ObjectId(id))
        if (!result) return null
        return this._getOutputNews(result)
    }

    private _getOutputNews(news: NewsDocument): OutputNewsModel {
        return {
            id: news._id.toString(),
            title: news.title,
            description: news.description,
            content: news.content,
            createdAt: news.createdAt,
            static_img: news.static_img,
            userId: news.userId
        }
    }
}

export const newsQueryRepository = new NewsQueryRepository()
