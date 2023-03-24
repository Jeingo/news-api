import { HTTP_STATUSES } from '../../../constants/http-statuses'
import { RequestWithBody } from '../../../global-types/request.type'
import { InputRegistrationModel } from '../models/input.registration.model'
import { InputLoginModel } from '../models/input.login.model'
import { Request, Response } from 'express'

class AuthController {
    async registration(req: RequestWithBody<InputRegistrationModel>, res: Response) {
        // await this.usersService.createUser(req.body.login, req.body.password, req.body.email, false)
        // res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async login(req: RequestWithBody<InputLoginModel>, res: Response) {}
    async logout(req: Request, res: Response) {}
    async refreshToken(req: Request, res: Response) {}
}

export const authController = new AuthController()
