import { Router } from 'express'
import registerValidation from './users.validation.js'
import { createUser, login } from './users.controller.js'

const router = Router()

router.post('/register', registerValidation, createUser)

router.post('/login', login)

export default router
