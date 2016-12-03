const router = require('express').Router()
const userService = require('../services/userService')
const handlePromise = require('../utils/promise')

router.post('/', (req,res) => {
  let name = req.body.username
  let pass = req.body.password
  handlePromise(userService.authenticate(name, pass))
})

module.exports = router
