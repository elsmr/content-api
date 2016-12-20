const router = require('express').Router({mergeParams: true})
const collectionItemService = require('../services/collectionItemService')
const handlePromise = require('../utils/promise')
const auth = require('../middleware/auth')

router.route('/')
  .get(auth.authorize({collections: {read: true}}), (req, res) => {
    let getItem = collectionItemService.getItem(req.params.name, req.params.id)
    handlePromise(getItem, res)
  })
  .put(auth.authorize({collections: {write: true}}), (req, res) => {
    let updateItem = collectionItemService.updateItem(req.params.name, req.params.id, req.body)
    handlePromise(updateItem, res)
  })
  .delete(auth.authorize({collections: {write: true}}), (req, res) => {
    let deleteItem = collectionItemService.deleteItem(req.params.name, req.params.id)
    handlePromise(deleteItem, res)
  })

module.exports = router
