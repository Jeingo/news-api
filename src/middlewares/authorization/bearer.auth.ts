import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUSES } from '../../constants/http-statuses'
import { jwtService } from '../../infrastructure/jwt.service'

export const bearerAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = jwtService.getUserIdByToken(token)

    if (!userId) {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        return
    }
    req.user = { userId: userId }
    next()
}
