const collection = require('../../models/collection')

module.exports = {
  up: (db, next) => {
    db.createCollection('collections')
      .then((coll) => {
        let ctr = 0
        let promise1 = coll.createIndex({"name": 1}, {unique:true, background:true, w:1})
        let promise2 = coll.insertOne(collection('books'))
        let promise3 = db.createCollection('books')

        Promise.all([promise1,promise2,promise3])
          .then(() => {
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
