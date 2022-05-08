const express = require('express')
const router = express.Router()
const productController = require('../controller/products')

router
  .get('/:id', productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', productController.insertProduct)
  .patch('/:id', productController.updateProducts)
  .delete(':id', productController.deleteProduct)
module.exports = router
