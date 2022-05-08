const pool = require('../config/db')

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1', [id],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const getAllProduct = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM products LIMIT $1 OFFSET $2',
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const insertProduct = ({ name, description, stock, price, idCategory, createdAt }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO products(name, description, stock, price, id_category, created_at)VALUES($1, $2, $3, $4, $5, $6)',
      [name, description, stock, price, idCategory, createdAt],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const updateProduct = (data, id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE product SET (name, description, stock, price, id_category, update_at) VALUE VALUES($1, $2, $3, $4, $5, $6) WHERE id = $8',
      [data, id],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
  })
}

const countProduct = () => {
  return pool.query('SELECT COUNT(*) AS total FROM products')
}

module.exports = {
  getProductById,
  getAllProduct,
  insertProduct,
  countProduct,
  updateProduct
}
