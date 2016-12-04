const router = require('express').Router()
const userService = require('../services/userService')

router.post('/', (req,res) => {
  let name = req.body.username
  let pass = req.body.password
  userService.authenticate(name, pass)
})

module.exports = router
