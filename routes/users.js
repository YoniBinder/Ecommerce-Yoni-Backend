var express = require('express');
var router = express.Router();
var passport = require('passport')
require('../strategies/jwt')
require('../strategies/google')


var GetUsers = require('../controllers/UsersController/get-users')
var GetOneUser = require('../controllers/UsersController/get-one-user')
var AddUser = require('../controllers/UsersController/post-user')
var UpdateUser = require('../controllers/UsersController/put-user')
var DeleteUser = require('../controllers/UsersController/delete-user')
var LoginUser = require('../controllers/UsersController/login-user')

router.get('/current', passport.authenticate('jwt'), function(req, res) {
    res.send(req.user);
});
router.get('/', GetUsers.usersIndex);
router.get('/:id', GetOneUser.findOneUser);
router.post('/jwt', LoginUser.Login);
router.post('/', AddUser.addUser);
// router.put('/:id', UpdateUser.updateUser);
router.delete('/:id', DeleteUser.deleteUser);
router.patch('/:id', UpdateUser.updateUser);

// var passport = require('passport')
// require('../strategies/google')

// router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/google' }), (req,res)=>{
//     let token = req.user.token
//     res.redirect(`http://localhost:3000/token/${token}`)
// })

// router.get('/image/:imageName', function (req, res, next) {
//     var imageName = req.params.imageName
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
// });

// router.post('/image', function (req, res, next) {
//     res.json({message:"picture uploaded successfully!"})
// })

module.exports = router;