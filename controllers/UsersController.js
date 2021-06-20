let User = require("../models/Users");
let bcrypt = require("bcrypt");
const saltRounds = 10;

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
  exports.findOneUser = function (req, res) {
    User.findOne({ _id: req.params.id }, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(result);
    });
  };
  
  exports.Login = function (req, res) {
    
    let email = req.body.email
    let password = req.body.password

    if (req.body.password) {
         User.find({email}, function(err,result){
            bcrypt.compare(password, result[0].password, function (err,hash) {
                if (err)
                    console.log(err)

                if (hash){
                    const user={
                      email
                    }
                    const token = User.generateAccessToken(user)
                    
                    return res.json({token})
                }
                else{
                    return res.json({message:"password/email does not match"})
                }
            })
        })
    }
    };
  
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
  exports.deleteUser = function (req, res) {
    console.log(req.params.id);
    User.findByIdAndDelete({ _id: req.params.id }, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ message: "Document Deleted" });
      }
    });
  };
  
  exports.updateUser = function (req, res) {
    const user = {
      role: req.body.role || "User",
      activity: req.body.activity ||"Active",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      profileImage: req.body.profileImage,
    };
  
    User.findByIdAndUpdate({ _id: req.params.id }, user, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  };
  
  // exports.addImagetoUser = function (req, res) {
  //   const user = {
  //     profileImage: req.body.profileImage,
  //   };
  
  //   User.findByIdAndUpdate({ _id: req.params.id }, user, function (err, result) {
  //     if (err) {
  //       return res.send(err);
  //     } else {
  //       return res.send(result);
  //     }
  //   });
  // };
  