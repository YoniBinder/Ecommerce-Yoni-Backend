let User = require("../../models/Users");
let bcrypt = require("bcrypt");

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