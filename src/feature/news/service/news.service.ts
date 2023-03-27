import { DbId } from '../../../global-types/db.types'
import { NewsModel } from '../domain/news.entity'
import { newsRepository } from '../repositories/news.repository'
import { UploadedFile } from 'express-fileupload'
import { fileService } from './file.service'
import * as schedule from 'node-schedule'
import { io } from '../../../app'

class NewsService {
    /**
     * Description: Create news
     */
    async createNews(
        title: string,
        description: string,
        content: string,
        userId: string,
        file?: UploadedFile
    ): Promise<DbId> {
        let fileName
        if (file) {
            fileName = await fileService.saveFile(file)
        }
        const news = NewsModel.make(title, description, content, userId, fileName)
        await newsRepository.save(news)
        io.emit('message', 'created news success')
        return news._id.toString()
    }

    /**
     * Description: Update news
     */
    async updateNews(id: DbId, title: string, description: string, content: string, userId: string): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false
        news.update(title, description, content)
        await newsRepository.save(news)
        io.emit('message', 'updated news success')
        return true
    }

    /**
     * Description: Delete news
     */
    async deleteNews(id: DbId, userId: string): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false
        news.delete()
        await newsRepository.save(news)
        io.emit('message', 'deleted news success')
        return true
    }

    /**
     * Description: Publish/unpublish news with delay
     */
    async publish(id: DbId, status: boolean, userId: string, delay?: number): Promise<boolean> {
        const news = await newsRepository.getNewsById(id)
        if (!news) return false
        if (!news.isOwner(userId)) return false

        if (delay && status) {
            const date = new Date(delay)
            const scheduler = async () => {
                news.publish(status)
                await newsRepository.save(news)
                io.emit('message', 'publish news success')
            }
            schedule.scheduleJob(date, scheduler)
        } else {
            news.publish(status)
            await newsRepository.save(news)
            io.emit('message', 'publish news success')
        }
        return true
    }
}

export const newsService = new NewsService()
