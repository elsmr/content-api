const collection = require('../../models/collection')

module.exports = {
  up: (db, next) => {
    db.createCollection('collections')
      .then((coll) => {
        Promise.all([
          coll.createIndex({'name': 1}, {unique:true, background:true, w:1}),
          coll.insertOne(collection('books')),
          db.createCollection('books')
        ]).then(() => {
          next()
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  down: (db, next) => {
    db.collection('collections').dropIndexes()
      .then(() => {
        db.dropCollection('collections', next)
      })
  }
}
