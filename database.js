const MongoClient = require('mongodb').MongoClient
const config = require('./config')

let _db

if ("cred" in config.db) {
  connPromise = MongoClient.connect(`mongodb://${config.db.cred.username}:${config.db.cred.password}@${config.db.host}:${config.db.port}/${config.db.db_name}`)
} else {
  connPromise = MongoClient.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.db_name}`)
}

connPromise
  .then((db) => {
    _db = db
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = {
  getDb: () => _db
}


