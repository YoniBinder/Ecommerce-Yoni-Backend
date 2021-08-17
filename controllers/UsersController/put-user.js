let User = require("../../models/Users");

exports.updateUser = function (req, res) {
    const user = {
      role: req.body.role || "User",
      activity: req.body.activity ||"Active",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      profileImage: req.body.profileImage,
    };
  
    User.findByIdAndUpdate({ _id: req.params.id }, user, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  };