import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { newsRepository } from '../repositories/news.repository'

class NewsService {
    async createNews(title: string, description: string, content: string, userId: string): Promise<DbId> {
        const news = NewsModel.make(title, description, content, userId)
        await newsRepository.save(news)
        return news._id.toString()
    }
    async updateNews(id: DbId, title: string, description: string, content: string, userId: string): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false
        news.update(title, description, content)
        await newsRepository.save(news)
        return true
    }

    async deleteNews(id: DbId): Promise<boolean> {
        return true
    }
}

export const newsService = new NewsService()
