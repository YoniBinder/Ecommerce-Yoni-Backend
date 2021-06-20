let Order = require("../models/Orders");

exports.ordersIndex = function (req, res) {
    Order.find({}, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };
  exports.findOneOrder = function (req, res) {
    Order.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };
  
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
    exports.deleteOrder = function (req, res) {
      Order.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.json({ message: "Document Deleted" });
        }
      });
    };
  