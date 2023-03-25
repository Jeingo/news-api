import { Request, Response, NextFunction } from 'express'
import { jwtService } from '../../infrastructure/jwt.service'

/**
 * Description: if user authorized then function add {userId} to req.user .
 *
 */
export const anonymousAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        next()
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = jwtService.getUserIdByToken(token)
    if (!userId) {
        next()
        return
    }
    req.user = { userId: userId }
    next()
}
