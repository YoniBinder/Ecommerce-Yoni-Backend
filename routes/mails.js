var express = require('express');
var router = express.Router();

var transporter = require('../config/mail.config')


//Mailing
router.get('/mails', function (req, res, next) {
    res.send('gettting mail route');
});

//Sending mail to client after successfull purchase
router.post('/sendMailToClient', function (req, res, next) {

    const to = req.body.to
    const subject = req.body.subject
    const orderNumber=req.body.orderNumber
    const mail = {
        from: process.env.THE_MAIL,
        to: to,
        subject,
        text:`
        Your order no. ${orderNumber} is processed. We will notify you when the order is ready
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
                status: 'success',
                reference: req.body.orderNumber
            })
    })

});

//sending mail to admin if client filed a complaint
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
