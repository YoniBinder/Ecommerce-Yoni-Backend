let Product = require("../../models/Products");


exports.addProduct = function (req, res) {
    const product = {
      id: "",
      title: req.body.title,
      description: req.body.description,
      hardware: req.body.hardware,
      image: req.body.image,
      onsale: req.body.onsale,
      price: req.body.price,
      rating: req.body.rating,
    };
    Product.create(product, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        result.id = String(result._id);
        Product.findByIdAndUpdate(
          { _id: result.id },
          result,
          function (err, result) {
            if (err) {
              console.log(err);
              return res.send(err);
            } else {
              return res.json(result);
            }
          }
        );
      }
    });
  };