var express = require('express');
var router = express.Router();
var GetOrders = require('../controllers/OrdersController/get-orders')
var GetOneOrder = require('../controllers/OrdersController/get-one-order')
var AddOrder = require('../controllers/OrdersController/post-order')
var UpdateOrder = require('../controllers/OrdersController/put-order')
var DeleteOrder = require('../controllers/OrdersController/delete-order')

router.get('/',  GetOrders.ordersIndex);
router.get('/:id', GetOneOrder.findOneOrder);
router.post('/', AddOrder.addOrder);
router.put('/:id', UpdateOrder.updateOrder);
router.delete('/:id', DeleteOrder.deleteOrder);

module.exports = router;