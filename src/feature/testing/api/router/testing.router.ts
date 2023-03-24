import { Router } from 'express'
import { testingController } from '../controller/testing.controller'

export const testRouter = Router({})

testRouter.delete('/', testingController.clearAllCollection)
