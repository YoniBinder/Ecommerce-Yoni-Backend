let Blog = require("../../models/Blogs");


exports.blogsIndex = function (req, res) {
    Blog.find({}, function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };