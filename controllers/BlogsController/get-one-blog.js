let Blog = require("../../models/Blogs")


exports.findOneBlog = function (req, res) {
    Blog.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      }
  
      return res.json(result);
    });
  };
  