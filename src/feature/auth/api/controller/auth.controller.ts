import { HTTP_STATUSES } from '../../../../constants/http-statuses'
import { RequestWithBody } from '../../../../global-types/request.type'
import { InputRegistrationModel } from './models/input.registration.model'
import { InputLoginModel } from './models/input.login.model'
import { Request, Response } from 'express'
import { usersService } from '../../../users/service/users.service'
import { authService } from '../../service/auth.service'
import { jwtService } from '../../../../infrastructure/jwt.service'
import { settings } from '../../../../settings/setting'

const SECURE_COOKIE_MODE = settings.SECURE_COOKIE_MODE == 'true'

class AuthController {
    /**
     * Description: Registration user
     */
    async registration(req: RequestWithBody<InputRegistrationModel>, res: Response) {
        const { login, email, password } = req.body
        await usersService.createUser(login, email, password)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

    /**
     * Description: Login user
     */
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

    /**
     * Description: Logout user
     */
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

    /**
     * Description: Update refresh and access token
     */
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
