let Order = require("../../models/Orders");


exports.addOrder = function (req, res) {
    const order = {
        id:"",
        userId:req.body.userId,
        products:req.body.products,
        city: req.body.city,
        street:req.body.street,
        house_number:req.body.house_number,
        reference:Math.floor(Math.random() * 10000 + 1),
        status:"Order Recieved",
        total:req.body.total
    };
    Order.create(order, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        result.id = String(result._id);
        Order.findByIdAndUpdate(
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