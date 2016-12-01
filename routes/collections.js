const router = require('express').Router()
const collectionService = require('../services/collectionService')

router.route('/')
  .get((req, res) => {
    let findColls = collectionService.findAll()
    handlePromise(findColls, res)
  })
  .post((req, res) => {
    let addColl = collectionService.addCollection(req.body)
    handlePromise(findColls, res)
  })
  .put((req, res) => {
    let addColl = collectionService.updateCollection(req.body)
    handlePromise(findColls, res)
  })

router.route('/:name')
  .get((req, res) => {
    let findCollEntries = collectionService.findAllFromCollection(req.param.name)
    handlePromise(findCollEntries, res)
  })
  .post((req, res) => {
    let addItemToColl = collectionService.addItemCollection(req.param.name,req.body)
    handlePromise(findColls, res)
  })


module.exports = router
