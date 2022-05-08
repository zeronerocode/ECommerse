const express = require('express')
const router = express.Router()
const productController = require('../controller/products')

router
  .get('/:id', productController.getProductById)
  .get('/', productController.getAllProduct)
  .post('/', productController.insertProduct)
module.exports = router
