import { HTTP_STATUSES } from '../../../constants/http-statuses'
import { RequestWithBody } from '../../../global-types/request.type'
import { InputRegistrationModel } from '../models/input.registration.model'
import { InputLoginModel } from '../models/input.login.model'
import { Request, Response } from 'express'
import { usersService } from '../../users/services/users.service'
import { authService } from '../services/auth.service'
import { jwtService } from '../../../infrastructure/jwt.service'
import { settings } from '../../../settings/setting'

const SECURE_COOKIE_MODE = settings.SECURE_COOKIE_MODE == 'true' //todo refactoring

class AuthController {
    async registration(req: RequestWithBody<InputRegistrationModel>, res: Response) {
        const { login, email, password } = req.body
        await usersService.createUser(login, email, password)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    async login(req: RequestWithBody<InputLoginModel>, res: Response) {
        const { loginOrEmail, password } = req.body
        const userId = await authService.checkCredentialsAndGetUserId(loginOrEmail, password)
        if (!userId) {
            res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
            return
        }
        const { accessToken, refreshToken } = jwtService.createPairOfToken(userId)

        await authService.saveSession(userId, refreshToken)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: SECURE_COOKIE_MODE
        })

        res.status(HTTP_STATUSES.OK_200).json({ accessToken: accessToken })
    }

    async logout(req: Request, res: Response) {
        const cookieRefreshToken = req.cookies.refreshToken

        const payload = await authService.checkAuthorizationAndGetPayload(cookieRefreshToken)

        if (!payload) {
            res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
            return
        }

        await authService.deleteSession(payload.userId)
        res.clearCookie('refreshToken')
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    async refreshToken(req: Request, res: Response) {
        const cookieRefreshToken = req.cookies.refreshToken

        const payload = await authService.checkAuthorizationAndGetPayload(cookieRefreshToken)

        if (!payload) {
            res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
            return
        }

        const { accessToken, refreshToken } = jwtService.createPairOfToken(payload.userId)

        await authService.saveSession(payload.userId, refreshToken)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: SECURE_COOKIE_MODE
        })

        res.status(HTTP_STATUSES.OK_200).json({ accessToken: accessToken })
    }
}

export const authController = new AuthController()
