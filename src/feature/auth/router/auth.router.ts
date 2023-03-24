import { Router } from 'express'
import {
    emailRegistrationValidation,
    loginOrEmailValidation,
    loginRegistrationValidation,
    passwordLoginValidation,
    passwordRegistrationValidation
} from '../../../middlewares/input.auth.validation'
import { inputValidation } from '../../../middlewares/input.validation'
import { authController } from '../controller/auth.controller'

export const authRouter = Router({})

authRouter.post(
    '/registration',
    loginRegistrationValidation,
    passwordRegistrationValidation,
    emailRegistrationValidation,
    inputValidation,
    authController.registration
)

authRouter.post('/login', loginOrEmailValidation, passwordLoginValidation, inputValidation, authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/refresh-token', authController.refreshToken)
