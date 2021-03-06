const express = require('express');
const cors = require('cors');
var nodemailer = require('nodemailer');
var Recaptcha = require('recaptcha-verify');
const path = require('path');
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let recaptcha = new Recaptcha({
    secret: '6LcEWHUUAAAAAIpNROjRCBTu_ZG8UXyuYNdMGAg2',
    verbose: true
});

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'majidkorai@gmail.com',
        pass: 'zzzvqcidgcngowqz'
    }
});

app.post('/api/contact', (req, res) => {
    //console.log(req.body)
    try {
        recaptcha.checkResponse(req.body.token, function (error, response) {
            if (error) {
                console.log(error.toString());
                res.send({ success: false, message: 'Sorry, there was an error submitting your response. I will fix it soon, you can try at some later time or send me an email on majidkorai@yahoo.com. Thank you :)' });
            }
            if (response.success) {
                console.log('the user is a HUMAN :)');
                let mailOptions = {
                    from: 'majidkorai@gmail.com', // sender address
                    to: 'majidkorai@yahoo.com', // list of receivers
                    subject: 'Inquiry received from majidkorai.com', // Subject line
                    html: `<p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p><p>Subject: ${req.body.subject}</p><p>Message: ${req.body.message}</p>`
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });
                res.send({ success: true, message: 'Your response has been received, I will get in touch if necessary. Thank you :)' });
                // save session.. create user.. save form data.. render page, return json.. etc.
            } else {
                console.log('the user is a ROBOT :(');
                res.send({ success: false, message: 'Sorry, your activity suggests, you are a bot :(, If you think I am wrong ? send me an email on majidkorai@yahoo.com :)' });
                // show warning, render page, return a json, etc.
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
