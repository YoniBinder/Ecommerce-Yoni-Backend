let Product = require("../../models/Products");

exports.deleteProduct = function (req, res) {
    console.log(req.params.id);
    Product.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ message: "Document Deleted" });
      }
    });
  };