const router = require('express').Router()
const collectionService = require('../services/collectionService')
const collectionItemRouter = require('./collectionItems')
const handlePromise = require('../utils/promise')

router.use('/:name/:id', collectionItemRouter)

router.route('/')
  .get((req, res) => {
    let getColls = collectionService.getCollections()
    handlePromise(findColls, res)
  })
  .post((req, res) => {
    let addColl = collectionService.addCollection(req.body)
    handlePromise(addColl, res)
  })

router.route('/:name')
  .get((req, res) => {
    let getItems = collectionService.getItems(req.param.name)
    handlePromise(getItems, res)
  })
  .post((req, res) => {
    let addItem = collectionService.addItem(req.param.name,req.body)
    handlePromise(addItem, res)
  })
  .put((req, res) => {
    let updateColl = collectionService.updateCollection(req.param.name,req.body)
    handlePromise(updateColl, res)
  })
  .delete((req, res) => {
    let deleteColl = collectionService.deleteCollection(req.param.name)
    handlePromise(deleteColl, res)
  })

module.exports = router
