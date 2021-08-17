let Post = require("../../models/Posts");

exports.findOnePost = function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };