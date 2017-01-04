const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(cors({origin: 'http://localhost:5471'}))
app.use(bodyParser.json())

const collectionRoutes = require('./routes/collections')
const mediaRoutes = require('./routes/media')
const authRoutes = require('./routes/auth')
app.use('/collections', collectionRoutes)
app.use('/media', mediaRoutes)
app.use('/auth', authRoutes)

module.exports = app
