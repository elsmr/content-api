const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser);

const rootRoutes = require('./routes/index')
const collectionRoutes = require('./routes/collections')
app.use('/', rootRoutes)
app.use('/collections', collectionRoutes)

module.exports = app
