import { Request, Response } from 'express'
import { UsersModel } from '../../../users/domain/user.entity'
import { NewsModel } from '../../../news/domain/news.entity'
import { HTTP_STATUSES } from '../../../../constants/http-statuses'

class TestingController {
    /**
     * Description: Clear all collection in db
     */
    async clearAllCollection(req: Request, res: Response) {
        await UsersModel.deleteMany({})
        await NewsModel.deleteMany({})
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
}

export const testingController = new TestingController()
