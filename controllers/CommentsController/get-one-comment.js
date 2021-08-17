let Comment = require("../../models/Comments");

exports.findOneComment = function (req, res) {
    Comment.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      }
      return res.json(result);
    });
  };