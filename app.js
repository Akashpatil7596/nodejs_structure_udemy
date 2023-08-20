import express from 'express'

import 'dotenv/config'

import bodyParser from 'body-parser'

import mongo_connection from './config/database.js'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

import users from './services/v1/users/index.js'

await mongo_connection('mongodb+srv://root:root@cluster0.u6ctlke.mongodb.net/?retryWrites=true&w=majority')

app.use('/api', users)
app.get('/',(req, res) => {
    res.send('Yup I think This Works')
       )
// unhandled routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'Failed',
    //     message: `Can't find ${req.originalUrl} on this server`,
    // })
    const err = new Error('Errors is here')
    // console.log(err)
    next(err)
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
    })
})

app.listen(80, () => {
    console.log(`connected on port 80`)
})
