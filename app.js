const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const collectionRoutes = require('./routes/collections')
const mediaRoutes = require('./routes/media')
app.use('/collections', collectionRoutes)
app.use('/media', mediaRoutes)

module.exports = app
