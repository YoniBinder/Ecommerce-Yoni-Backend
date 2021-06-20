let Post = require("../models/Posts");

exports.postsIndex = function (req, res) {
    Post.find({}, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };
  exports.findOnePost = function (req, res) {
    Post.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };
  