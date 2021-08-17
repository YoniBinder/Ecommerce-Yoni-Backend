let Comment = require("../../models/Comments");

exports.commentsIndex = function (req, res) {
    Comment.find({}, function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };