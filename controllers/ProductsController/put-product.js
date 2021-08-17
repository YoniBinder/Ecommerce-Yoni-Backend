let Product = require("../../models/Products");

exports.updateProduct = function (req, res) {
    const product = {
      title: req.body.title,
      description: req.body.description,
      hardware: req.body.hardware,
      image: req.body.image,
      onsale: req.body.onsale,
      price: req.body.price,
      rating: req.body.rating,
    };
  
    Product.findByIdAndUpdate(
      { _id: req.params.id },
      product,
      function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(result);
        }
      }
    );
  };