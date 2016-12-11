const seed = require('../database/seed')
const arg = process.argv[2] || 'up'

if(arg !== 'up' && arg !== 'down') {
  console.log('Invalid argument')
  process.exit(1)
}
else {
  if(arg === 'up') {
    seed.up(() => process.exit(0))
  }
  else {
    seed.down(() => process.exit(0))
  }
}
