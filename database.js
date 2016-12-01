const MongoClient = require('mongodb').MongoClient
const config = require('../config')

const mongoDb = {}
let connPromise

if ("cred" in config.db) {
  connPromise = MongoClient.connect(`mongodb://${config.db.cred.username}:${config.db.cred.password}@${config.db.host}:${config.db.port}/${config.db.db_name}`)
} else {
  connPromise = MongoClient.connect(`${config.db.host}:${config.db.port}/${config.db.db_name}`)
}

connPromise
  .then((db) => {
    mongoDb = db
  })
  .err((err) => {
    console.log(err)
  })

module.exports = mongoDb
