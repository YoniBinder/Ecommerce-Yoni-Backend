let User = require("../../models/Users");

exports.findOneUser = function (req, res) {
    User.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };