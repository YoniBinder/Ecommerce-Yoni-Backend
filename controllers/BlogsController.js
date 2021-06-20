let Blog = require("../models/Blogs");


exports.blogsIndex = function (req, res) {
    Blog.find({}, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };
  exports.findOneBlog = function (req, res) {
    Blog.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      return res.json(result);
    });
  };
  