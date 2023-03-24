import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { ObjectId } from 'mongodb'
import { NewsDocument } from '../domain/news.entity.type'

class NewsRepository {
    async getNewsById(id: DbId): Promise<NewsDocument | null> {
        return NewsModel.findById(new ObjectId(id))
    }
    async save(news: NewsDocument): Promise<NewsDocument> {
        return await news.save()
    }
}

export const newsRepository = new NewsRepository()
