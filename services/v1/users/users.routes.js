import { Router } from 'express'

const router = Router()

import upload from '../../../config/multer.js'

import { createUser, login } from './users.controller.js'

router.get('/v1/users/create', upload, createUser)

router.get('/v1/users/login', login)

export default router
