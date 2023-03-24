import { Request, Response } from 'express'
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

class NewsController {
    async getAllNews(req: RequestWithQuery<QueryNews>, res: Response<PaginatedType<OutputNewsModel>>) {}
    async getNewsById(req: RequestWithParams<IdParams>, res: Response<OutputNewsModel>) {}
    async createNews(req: RequestWithBody<InputCreateModel>, res: Response<OutputNewsModel>) {}
    async updateNews(req: RequestWithParamsAndBody<IdParams, InputUpdateModel>, res: Response) {}
    async deleteNews(req: RequestWithParams<IdParams>, res: Response) {}
}

export const newsController = new NewsController()
