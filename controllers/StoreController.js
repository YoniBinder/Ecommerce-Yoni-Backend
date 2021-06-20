let Store = require("../models/StoreDetails");

exports.storeIndex = function (req, res) {
    Store.find({}, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };
  exports.findStoreDetails = function (req, res) {
    Store.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };
  exports.updateStoreDetails = function (req, res) {
    const storeDetails = {
      storeName: req.body.storeName,
      storeAdress: req.body.storeAdress,
      phoneNumber: req.body.phoneNumber,
      storeEmail: req.body.storeEmail,
      storePic: req.body.storePic,
    };
  
    Store.findByIdAndUpdate(
      { _id: req.params.id },
      storeDetails,
      function (err, result) {
        if (err) {
          return res.send(err);
        } else {
          return res.send(result);
        }
      }
    );
  };
  