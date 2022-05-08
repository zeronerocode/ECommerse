require('dotenv').config()
const express = require('express')
const cors = require('cors')
const createError = require('http-errors')

const categoryRouter = require('./src/routes/category')
const productRouter = require('./src/routes/products')
const transactionRouter = require('./src/routes/transaction')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/transaction', transactionRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'Internal Server Error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})
