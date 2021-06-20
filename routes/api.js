var express = require('express');
var router = express.Router();
var ProductsController = require('../controllers/ProductsController')
var CommentsController = require('../controllers/CommentsController')
var PostsController = require('../controllers/PostsController')
var UsersController = require('../controllers/UsersController')
var OrdersController = require('../controllers/OrdersController')
var BlogsController = require('../controllers/BlogsController')
var StoreController = require('../controllers/StoreController')
var path = require('path')
var passport = require('passport')
require('../strategies/jwt')
require('../strategies/google')
var transporter = require('../config/mail.config')




/* RESTFUL API */

//Products
router.get('/products',  ProductsController.productsIndex);
router.get('/products/:id', ProductsController.findOneProduct);
router.post('/products', ProductsController.addProduct);
router.put('/products/:id', ProductsController.updateProduct);
router.delete('/products/:id', ProductsController.deleteProduct);

//Blogs
router.get('/blogs',  BlogsController.blogsIndex);
router.get('/blogs/:id', BlogsController.findOneBlog);

//Posts
router.get('/posts',  PostsController.postsIndex);
router.get('/posts/:id', PostsController.findOnePost);

//Users
router.get('/current', passport.authenticate('jwt'), function(req, res) {
    res.send(req.user);
});
router.get('/users', UsersController.usersIndex);
router.get('/users/:id', UsersController.findOneUser);
router.post('/jwt', UsersController.Login);
router.post('/users', UsersController.addUser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);
router.post('/image', function (req, res, next) {
    res.json({message:"picture uploaded successfully!"})
})
// router.get('/image/:imageName', function (req, res, next) {
//     var imageName = req.params.imageName
//     res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
// });
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:3000/home');
//   });



//Orders
router.get('/orders',  OrdersController.ordersIndex);
router.get('/orders/:id', OrdersController.findOneOrder);
router.post('/orders', OrdersController.addOrder);
router.put('/orders/:id', OrdersController.updateOrder);
router.delete('/orders/:id', OrdersController.deleteOrder);

//Comments
router.get('/comments',  CommentsController.commentsIndex);
router.get('/comments/:id', CommentsController.findOneComment);

//StoreDetails

router.get('/details',  StoreController.storeIndex);
router.get('/details/:id', StoreController.findStoreDetails);
router.put('/details/:id', StoreController.updateStoreDetails);

//Mailing
router.get('/mails', function (req, res, next) {
    res.send('gettting mail route');
});


router.post('/sendMailFromClient', function (req, res, next) {

    const from = req.body.from
    const user = req.body.user
    const name = req.body.name
    const subject = req.body.subject
    const text = req.body.text

    const mail = {
        from: from,
        to: process.env.THE_MAIL,
        subject,
        text:`
        mail from ${from}
        name: ${name}
        existing user: ${user}
        subject: ${subject}
        content: ${text}
        `
    }
    transporter.sendMail(mail, (err, data) => {
        if (err)
            res.json({
                status: 'failed',
                message: err.message
            })
        else
            res.json({
                status: 'success'
            })
    })

});


module.exports = router;
