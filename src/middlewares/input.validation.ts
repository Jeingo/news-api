import { validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HTTP_STATUSES } from '../constants/http-statuses'

const baseValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            message: error.msg,
            field: error.param
        }
    }
})

export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = baseValidationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errorsMessages: errors.array({ onlyFirstError: true }) })
    } else {
        next()
    }
}

export const idValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    next()
}
