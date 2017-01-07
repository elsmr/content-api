const mongo = require('../database/database')

const seedDb = () => {
  mongo.connect()
    .then(() => {
      mongo.get().dropDatabase()
      console.log('database dropped')
    })
    .then(() => {
      const seed = require('child_process').exec('./node_modules/node-mongo-seeds/bin/seed')
      seed.on('close', () => {
        console.log('seed complete')
        createIndexes()
          .then(() => {
            console.log('indexes created')
            process.exit(0)
          })
          .catch((err) => {
            console.log('Error', err)
            process.exit(1)
          })
      })
    })
    .catch((err) => {
      console.log('Error', err)
      process.exit(1)
    })
}

const createIndexes = () => {
  return mongo.get().collection('collections').createIndex({'name': 1}, {unique:true, background:true, w:1})
}

seedDb()
