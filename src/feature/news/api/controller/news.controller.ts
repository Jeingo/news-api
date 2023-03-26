import { Response } from 'express'
import {
    IdParams,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
    StatusPublish
} from '../../../../global-types/request.type'
import { QueryNews } from './models/input.query.model'
import { PaginatedType } from '../../../../global-types/query.type'
import { OutputNewsModel } from './models/output.news.model'
import { InputUpdateModel } from './models/input.update.model'
import { InputCreateModel } from './models/input.create.model'
import { newsService } from '../../service/news.service'
import { HTTP_STATUSES } from '../../../../constants/http-statuses'
import { newsQueryRepository } from '../../repositories/news.query.repository'
import { UploadedFile } from 'express-fileupload'

class NewsController {
    /**
     * Description: Return all news .
     */
    async getAllNews(req: RequestWithQuery<QueryNews>, res: Response<PaginatedType<OutputNewsModel>>) {
        const allNews = await newsQueryRepository.getAllNews(req.query, req.user?.userId)
        res.status(HTTP_STATUSES.OK_200).json(allNews)
    }

    /**
     * Description: Return news by id
     */
    async getNewsById(req: RequestWithParams<IdParams>, res: Response<OutputNewsModel>) {
        const news = await newsQueryRepository.getNewsById(req.params.id, req.user?.userId)

        if (!news) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res.json(news)
    }

    /**
     * Description: Create news
     */
    async createNews(req: RequestWithBody<InputCreateModel>, res: Response<OutputNewsModel>) {
        const { title, description, content } = req.body
        const file = req.files?.file as UploadedFile
        const newsId = await newsService.createNews(title, description, content, req.user!.userId, file)
        const news = await newsQueryRepository.getNewsById(newsId, req.user!.userId)
        res.status(HTTP_STATUSES.CREATED_201).json(news!)
    }

    /**
     * Description: Update news
     */
    async updateNews(req: RequestWithParamsAndBody<IdParams, InputUpdateModel>, res: Response) {
        const { title, description, content } = req.body

        const updatedBlog = await newsService.updateNews(req.params.id, title, description, content, req.user!.userId)

        if (!updatedBlog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    /**
     * Description: Delete news
     */
    async deleteNews(req: RequestWithParams<IdParams>, res: Response) {
        const deletedBlog = await newsService.deleteNews(req.params.id, req.user!.userId)

        if (!deletedBlog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    /**
     * Description: Publish/unpublish news
     */
    async publish(req: RequestWithParamsAndBody<IdParams, StatusPublish>, res: Response) {
        const news = await newsService.publish(req.params.id, req.body.status, req.user!.userId, req.body.delay)

        if (!news) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
}

export const newsController = new NewsController()
