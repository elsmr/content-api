const router = require('express').Router()
const mediaService = require('../services/mediaService')
const handlePromise = require('../utils/promise')
const auth = require('../middleware/auth')

router.use(auth.authenticate)

router.route('/')
  .get(auth.authorize({media: {read: true}}), (res) => {
    let getMedia = mediaService.getAll()
    handlePromise(getMedia,res)
  })

module.exports = router
