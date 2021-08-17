let Order = require("../../models/Orders");

exports.updateOrder = function (req, res) {
    const order = {
      status: req.body.status,
    };
  
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      order,
      function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(result);
        }
      }
    );
  };