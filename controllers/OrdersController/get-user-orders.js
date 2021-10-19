let Order = require("../../models/Orders");

exports.userOrders = function (req, res) {
    Order.find({ userId: req.params.user }, function (err, result) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.json(result);
      });
  };
