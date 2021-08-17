var express = require('express');
var router = express.Router();

var GetStoreDetails = require('../controllers/StoreController/get-store-details')
var updateStoreDetails = require('../controllers/StoreController/put-store-details')


router.get('/',  GetStoreDetails.storeIndex);
router.put('/:id', updateStoreDetails.updateStoreDetails);

module.exports = router;