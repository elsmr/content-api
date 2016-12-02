const router = require('express').Router()
const mediaService = require('../services/mediaService')

router.route('/')
  .get((res) => {
    mediaService.getAll()
      .then((data) => {
        res.json(data)
      })
      .catch((err) => {
        res.send(err)
      })
  })

module.exports = router
