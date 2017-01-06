const mongo = require('./database')
const collections = require('./seeds/collections')
const collectionItems = require('./seeds/collectionItems')
const media = require('./seeds/media')
const users = require('./seeds/users')

const up = (callback) => {
  mongo.connect()
    .then(() => {
      let db = mongo.get()
      collections.up(db, () => {
        collectionItems.up(db, () => {
          media.up(db, () => {
            users.up(db, () => {
              callback()
            })
          })
        })
      })
    })
}

const down = (callback) => {
  mongo.connect()
    .then(() => {
      mongo.get().dropDatabase(callback)
    })
}

module.exports = {
  up,
  down
}
