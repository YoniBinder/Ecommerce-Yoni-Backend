let Order = require("../../models/Orders");


exports.findOneOrder = function (req, res) {
    Order.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };