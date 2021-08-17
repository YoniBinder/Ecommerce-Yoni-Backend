let User = require("../../models/Users");
exports.deleteUser = function (req, res) {
    User.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ message: "Document Deleted" });
      }
    });
  };
  