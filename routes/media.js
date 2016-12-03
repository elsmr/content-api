const router = require('express').Router()
const mediaService = require('../services/mediaService')
const handlePromise = require('../utils/promise')

router.route('/')
  .get((res) => {
    handlePromise(mediaService.getAll())
  })

module.exports = router
