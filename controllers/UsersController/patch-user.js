let User = require("../../models/Users");

exports.updateUser = function (req, res) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
    };
  
    User.findByIdAndUpdate({ _id: req.params.id }, user, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  };