import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { ObjectId } from 'mongodb'
import { NewsDocument } from '../domain/news.entity.type'

class NewsRepository {
    /**
     * Description: Return news document by id
     */
    async getNewsById(id: DbId): Promise<NewsDocument | null> {
        return NewsModel.findById(new ObjectId(id))
    }

    /**
     * Description: Save news to db and return yourself
     */
    async save(news: NewsDocument): Promise<NewsDocument> {
        return await news.save()
    }
}

export const newsRepository = new NewsRepository()
