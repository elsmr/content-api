var router = require('express').Router({mergeParams: true});
var handlePromise = require('../utils/promise')

router.route('/')
  .get((req, res) => {
    let getItem = collectionService.getItem(req.param.name)
    handlePromise(getItem, res)
  })
  .put((req, res) => {
    let updateItem = collectionService.updateItem(req.param.name,req.body)
    handlePromise(updateItem, res)
  })
  .delete((req, res) => {
    let deleteItem = collectionService.deleteItem(req.param.name)
    handlePromise(deleteItem, res)
  })

module.exports = router;
