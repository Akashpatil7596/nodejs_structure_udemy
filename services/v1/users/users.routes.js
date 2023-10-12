import { Router } from 'express'

const router = Router()

import upload from '../../../config/multer.js'

import { createUser, login } from './users.controller.js'

router.post('/register', upload, createUser)

router.post('/login', login)

export default router
