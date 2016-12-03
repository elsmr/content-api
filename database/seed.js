const mongo = require('./database')
const collections = require('./seeds/collections')
const collectionItems = require('./seeds/collectionItems')
const media = require('./seeds/media')
const users = require('./seeds/users')
const arg = process.argv[2] || 'up'

if(arg !== 'up' && arg !== 'down') {
  console.log('Invalid argument')
  process.exit(1)
}
else {
  mongo.connect()
    .then(() => {
      let db = mongo.get()
      if(arg === 'up') {
        collections.up(db, () => {
          collectionItems.up(db, () => {
            media.up(db, () => {
              users.up(db, () => {
                process.exit(0)
              })
            })
          })
        })
      } else {
        collections.down(db, () => {
          collectionItems.down(db, () => {
            media.down(db, () => {
              users.down(db, () => {
                process.exit(0)
              })
            })
          })
        })
      }
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
}
