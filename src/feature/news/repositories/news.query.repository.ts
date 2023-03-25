import { DbId } from '../../../global-types/db.types'
import { OutputNewsModel } from '../api/controller/models/output.news.model'
import { NewsModel } from '../domain/news.entity'
import { ObjectId } from 'mongodb'
import { NewsDocument } from '../domain/news.entity.type'
import { QueryNews } from '../api/controller/models/input.query.model'
import { PaginatedType } from '../../../global-types/query.type'
import { makeDirectionToNumber } from '../../../helper/helper'
import { SortOrder } from 'mongoose'

class NewsQueryRepository {
    async getAllNews(query: QueryNews, userId?: string): Promise<PaginatedType<OutputNewsModel>> {
        const { sortBy = 'createdAt', sortDirection = 'desc', pageNumber = 1, pageSize = 10 } = query

        const sortDirectionNumber = makeDirectionToNumber(sortDirection) as SortOrder
        const skipNumber = (+pageNumber - 1) * +pageSize

        let filter
        if (userId) {
            filter = {
                $or: [
                    { isDeleted: false, published: true },
                    { isDeleted: false, published: false, userId: userId }
                ]
            }
        } else {
            filter = { isDeleted: false, published: true }
        }

        const countAllDocuments = await NewsModel.countDocuments(filter)

        const res = await NewsModel.find(filter)
            .sort({ [sortBy]: sortDirectionNumber })
            .skip(skipNumber)
            .limit(+pageSize)
            .exec()

        return this.getPaginatedType(res.map(this.getOutputNews), +pageSize, +pageNumber, countAllDocuments)
    }
    async getNewsById(id: DbId, userId?: string): Promise<OutputNewsModel | null> {
        let result
        if (userId) {
            result = await NewsModel.findOne().or([
                { _id: new ObjectId(id), isDeleted: false, published: true },
                { _id: new ObjectId(id), isDeleted: false, published: false, userId: userId }
            ])
        } else {
            result = await NewsModel.findOne({ _id: new ObjectId(id), isDeleted: false, published: true })
        }

        if (!result) return null
        return this.getOutputNews(result)
    }

    private getOutputNews(news: NewsDocument): OutputNewsModel {
        return {
            id: news._id.toString(),
            title: news.title,
            description: news.description,
            content: news.content,
            createdAt: news.createdAt,
            userId: news.userId,
            fileName: news.fileName
        }
    }

    private getPaginatedType = (
        items: OutputNewsModel[],
        pageSize: number,
        pageNumber: number,
        countDoc: number
    ): PaginatedType<OutputNewsModel> => {
        return {
            pagesCount: Math.ceil(countDoc / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: countDoc,
            items: items
        }
    }
}

export const newsQueryRepository = new NewsQueryRepository()
