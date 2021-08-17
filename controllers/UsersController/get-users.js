let User = require("../../models/Users");


exports.usersIndex = function (req, res) {
    User.find({}, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };
