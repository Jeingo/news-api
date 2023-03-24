import { Response } from 'express'
import {
    IdParams,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from '../../../../global-types/request.type'
import { QueryNews } from './models/input.query.model'
import { PaginatedType } from '../../../../global-types/query.type'
import { OutputNewsModel } from './models/output.news.model'
import { InputUpdateModel } from './models/input.update.model'
import { InputCreateModel } from './models/input.create.model'
import { newsService } from '../../service/news.service'
import { HTTP_STATUSES } from '../../../../constants/http-statuses'
import { newsQueryRepository } from '../../repositories/news.query.repository'

class NewsController {
    async getAllNews(req: RequestWithQuery<QueryNews>, res: Response<PaginatedType<OutputNewsModel>>) {}

    async getNewsById(req: RequestWithParams<IdParams>, res: Response<OutputNewsModel>) {
        const news = await newsQueryRepository.getNewsById(req.params.id, req.user?.userId)

        if (!news) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return
        }
        res.json(news)
    }

    async createNews(req: RequestWithBody<InputCreateModel>, res: Response<OutputNewsModel>) {
        const { title, description, content } = req.body
        const newsId = await newsService.createNews(title, description, content, req.user!.userId)
        const news = await newsQueryRepository.getNewsById(newsId, req.user!.userId)
        res.status(HTTP_STATUSES.CREATED_201).json(news!)
    }

    async updateNews(req: RequestWithParamsAndBody<IdParams, InputUpdateModel>, res: Response) {}

    async deleteNews(req: RequestWithParams<IdParams>, res: Response) {}
}

export const newsController = new NewsController()
