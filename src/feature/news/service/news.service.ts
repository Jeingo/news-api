import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { newsRepository } from '../repositories/news.repository'
import { UploadedFile } from 'express-fileupload'
import { fileService } from './file.service'

class NewsService {
    async createNews(
        title: string,
        description: string,
        content: string,
        file: UploadedFile,
        userId: string
    ): Promise<DbId> {
        const fileName = await fileService.saveFile(file)
        const news = NewsModel.make(title, description, content, userId, fileName)
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

    async deleteNews(id: DbId, userId: string): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false
        news.delete()
        await newsRepository.save(news)
        return true
    }

    async publish(id: DbId, status: boolean, userId: string): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false
        news.publish(status)
        await newsRepository.save(news)
        return true
    }
}

export const newsService = new NewsService()
