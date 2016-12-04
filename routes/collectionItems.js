const router = require('express').Router({mergeParams: true});
const collectionItemService = require('../services/collectionItemService')
const handlePromise = require('../utils/promise')

router.route('/')
  .get((req, res) => {
    let getItem = collectionItemService.getItem(req.params.name, req.params.id)
    handlePromise(getItem, res)
  })
  .put((req, res) => {
    let updateItem = collectionItemService.updateItem(req.params.name, req.params.id, req.body)
    handlePromise(updateItem, res)
  })
  .delete((req, res) => {
    let deleteItem = collectionItemService.deleteItem(req.params.name, req.params.id)
    handlePromise(deleteItem, res)
  })

module.exports = router;
