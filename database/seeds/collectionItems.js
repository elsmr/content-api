const collectionItem = require('../../models/collectionItem')

module.exports = {
  up: (db, next) => {
    db.collection('collections').findOne({name :'books'})
      .then((booksColl) => {
        db.collection('books').insertOne(collectionItem(booksColl), next)
      })
  },
  down: (db, next) => {
    db.dropCollection('books', next)
  }
}
