const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction')

router
  .get('/:id', transactionController.getTransactionById)
  .get('/', transactionController.getAllTransaction)
  .post('/', transactionController.insertTransaction)

module.exports = router
