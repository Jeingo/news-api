import { Router } from 'express'
import { idValidation, inputValidation } from '../../../../middlewares/input.validation'
import { bearerAuth } from '../../../../middlewares/authorization/bearer.auth'
import { newsController } from '../controller/news.controller'
import {
    contentValidation,
    delayValidation,
    descriptionValidation,
    statusValidation,
    titleValidation
} from '../../../../middlewares/input.news.validation'
import { anonymousAuth } from '../../../../middlewares/authorization/anonymous.auth'

export const newsRouter = Router({})

newsRouter.get('/', anonymousAuth, newsController.getAllNews)

newsRouter.get('/:id', idValidation, anonymousAuth, newsController.getNewsById)

newsRouter.post(
    '/',
    bearerAuth,
    titleValidation,
    descriptionValidation,
    contentValidation,
    inputValidation,
    newsController.createNews
)

newsRouter.put(
    '/:id',
    bearerAuth,
    idValidation,
    titleValidation,
    descriptionValidation,
    contentValidation,
    inputValidation,
    newsController.updateNews
)

newsRouter.delete('/:id', bearerAuth, idValidation, newsController.deleteNews)

newsRouter.put(
    '/:id/publish',
    bearerAuth,
    idValidation,
    statusValidation,
    delayValidation,
    inputValidation,
    newsController.publish
)
