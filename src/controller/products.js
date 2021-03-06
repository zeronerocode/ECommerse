const productModel = require('../model/products')
const createError = require('http-errors')
const errorServ = new createError.InternalServerError()

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await productModel.getProductById(id)
    res.status(200).json({
      data: result
    })
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

const getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const sortdata = req.query.sort || 'id'
    const typeSort = req.query.typesort || 'ASC'
    const search = req.query.search
    const offset = (page - 1) * limit
    const result = await productModel.getAllProduct({ offset, limit, sortdata, typeSort, search })

    // paginatino
    const { rows: [count] } = await productModel.countProduct()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)

    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage
      },
      data: result
    })
  } catch (error) {
    console.log(error)
    next(errorServ)
  }
}

const insertProduct = (req, res, next) => {
  const { name, description, price, stock, idCategory } = req.body

  const data = {
    name,
    description,
    stock,
    price,
    idCategory,
    createdAt: new Date()
  }
  productModel.insertProduct(data)
    .then(() => {
      res.status(201).json({
        data
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorServ)
    })
}

const updateProduct = (req, res, next) => {
  const id = req.params.id
  const { name, description, price, stock, idCategory } = req.body
  const data = {
    name,
    description,
    stock,
    price,
    idCategory,
    createdAt: new Date()
  }
  productModel.updateProduct(data, id)
    .then(() => {
      res.status(201).json({
        data
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}

const deleteProduct = (req, res, next) => {
  const id = req.params.id
  productModel.deleteCategory(id)
    .then(() => {
      res.json({
        message: 'data berhasil di hapus'
      })
    })
    .catch((error) => {
      console.log(error)
      next(new createError.InternalServerError())
    })
}

module.exports = {
  getProductById,
  getAllProduct,
  insertProduct,
  deleteProduct,
  updateProduct
}
