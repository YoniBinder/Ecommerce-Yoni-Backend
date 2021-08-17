let Store = require("../../models/StoreDetails");

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