const router = require('express').Router()
const userService = require('../services/userService')
const handlePromise = require('../utils/promise')

router.post('/', (req,res) => {
  let [username, password] = [req.body.username, req.body.password]
  handlePromise(userService.authenticate(username, password), res)
})

module.exports = router
