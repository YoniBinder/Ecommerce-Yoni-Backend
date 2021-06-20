var express = require('express');
var router = express.Router();
var path = require('path')

/* GET images listing. */
router.get('/:imageName',jwt,function (req, res, next) {
    var imageName = req.params.imageName
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
});

module.exports = router;
