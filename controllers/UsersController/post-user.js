let User = require("../../models/Users");
let bcrypt = require("bcrypt");
const saltRounds = 10;

  exports.addUser = function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) console.log(err);
  
      const user = {
          id: "",
          email: req.body.email,
          username: req.body.username,
          password: hash,
          role: "User",
          activity: "Active",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          country: "",
          profileImage: "",   
      };
  
      User.create(user, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          result.id = String(result._id);
          User.findByIdAndUpdate(
            { _id: result.id },
            result,
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                return res.json({ message:"user created"});
              }
            }
          );
        }
      });
        
    });
  };