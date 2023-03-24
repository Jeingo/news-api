import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { newsRepository } from '../repositories/news.repository'

class NewsService {
    async createNews(title: string, description: string, content: string, userId: string): Promise<DbId> {
        const news = NewsModel.make(title, description, content, userId)
        await newsRepository.save(news)
        return news._id.toString()
    }
    async updateBlog(id: DbId, title: string, description: string, content: string): Promise<boolean> {
        return true
    }

    async deleteBlog(id: DbId): Promise<boolean> {
        return true
    }
}

export const newsService = new NewsService()
