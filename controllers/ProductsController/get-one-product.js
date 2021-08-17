let Product = require("../../models/Products");


exports.findOneProduct = function (req, res) {
    Product.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };
  