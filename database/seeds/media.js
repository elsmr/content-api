const media = require('../../models/media')

module.exports = {
  up: (db, next) => {
    db.createCollection('media')
      .then((coll) => {
        coll.insertOne(media('Test image','/media/test.jpg'), next)
      })
  },
  down: (db, next) => {
    db.dropCollection('media', next)
  }
}
