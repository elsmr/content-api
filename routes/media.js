const router = require('express').Router()
const mediaService = require('../services/mediaService')

router.route('/')
  .get((res) => {
    mediaService.getAll()
    res.json({})
  })

module.exports = router
