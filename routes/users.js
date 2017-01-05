const router = require('express').Router()
const userService = require('../services/userService')
const handlePromise = require('../utils/promise')
const auth = require('../middleware/auth')

router.use(auth.authenticate)
router.use(auth.authorize({admin: true}))

router.route('/')
  .get((req, res) => {
    let getUsers = userService.getUsers()
    handlePromise(getUsers, res)
  })
  .post((req, res) => {
    let hostname = `${req.protocol}://${req.get('Host')}`
    let addUser = userService.addUser(req.body, hostname)
    handlePromise(addUser, res)
  })

router.route('/:username')
  .get((req, res) => {
    let getUser = userService.getUser(req.params.username)
    handlePromise(getUser, res)
  })
  .put((req, res) => {
    let updateUser = userService.updateUser(req.params.username,req.body)
    handlePromise(updateUser, res)
  })
  .delete((req, res) => {
    let deleteUser = userService.deleteUser(req.params.username)
    handlePromise(deleteUser, res)
  })

module.exports = router
