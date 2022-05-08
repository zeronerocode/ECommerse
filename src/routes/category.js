const express = require('express')
const router = express.Router()
const categoryControler = require('../controller/category')

router
  .get('/', categoryControler.getCategory)
  .post('/', categoryControler.insertCategory)
  .get('/:id', categoryControler.getCategoryByid)
  .delete('/:id', categoryControler.deleteCategory)
  .patch('/:id', categoryControler.updateCategory)

module.exports = router
