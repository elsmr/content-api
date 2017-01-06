const mongo = require('../database/database')

require('child_process').exec('./node_modules/node-mongo-seeds/bin/seed', (err) => {
  if(err)
    process.exit(1)
  createIndexes()
})

const createIndexes = () => {
  mongo.connect()
  .then(() => mongo.get().collection('collections').createIndex({'name': 1}, {unique:true, background:true, w:1}))
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
}
