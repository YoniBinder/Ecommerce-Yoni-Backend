let Store = require("../../models/StoreDetails");

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