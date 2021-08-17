var express = require('express');
var router = express.Router();

var GetProducts = require('../controllers/ProductsController/get-products')
var GetOneProduct = require('../controllers/ProductsController/get-one-product')
var AddProduct = require('../controllers/ProductsController/post-product')
var UpdateProduct = require('../controllers/ProductsController/put-product')
var DeleteProduct = require('../controllers/ProductsController/delete-product')

router.get('/',  GetProducts.productsIndex);
router.get('/:id', GetOneProduct.findOneProduct);
router.post('/', AddProduct.addProduct);
router.put('/:id', UpdateProduct.updateProduct);
router.delete('/:id', DeleteProduct.deleteProduct);

module.exports = router;