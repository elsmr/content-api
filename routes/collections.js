const router = require('express').Router()
const collectionService = require('../services/collectionService')
const collectionItemRouter = require('./collectionItems')
const handlePromise = require('../utils/promise')
const auth = require('../middleware/auth')

router.use(auth.authenticate)
router.use('/:name/items/:id', collectionItemRouter)

router.route('/')
  .get(auth.authorize({collections: {read: true}}), (req, res) => {
    let getColls = collectionService.getCollections()
    handlePromise(getColls, res)
  })
  .post(auth.authorize({admin: true}), (req, res) => {
    let addColl = collectionService.addCollection(req.body)
    handlePromise(addColl, res)
  })

router.route('/:name')
  .get(auth.authorize({admin: true}), (req, res) => {
    let getColl = collectionService.getCollection(req.params.name)
    handlePromise(getColl, res)
  })
  .put(auth.authorize({admin: true}), (req, res) => {
    let updateColl = collectionService.updateCollection(req.params.name,req.body)
    handlePromise(updateColl, res)
  })
  .delete(auth.authorize({admin: true}), (req, res) => {
    let deleteColl = collectionService.deleteCollection(req.params.name)
    handlePromise(deleteColl, res)
  })

router.route('/:name/items')
  .get(auth.authorize({collections: {read: true}}), (req, res) => {
    let getItems = collectionService.getItems(req.params.name)
    handlePromise(getItems, res)
  })
  .post(auth.authorize({collections: {write: true}}), (req, res) => {
    let addItem = collectionService.addItem(req.params.name,req.body)
    handlePromise(addItem, res)
  })

module.exports = router
