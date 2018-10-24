const express = require('express');
var nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'majidkorai@gmail.com',
        pass: 'fvmetfqmcpgoxomv'
    }
});

// API calls
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/contact', (req, res) => {
    console.log(req.body)
    let mailOptions = {
        from: 'majidkorai@gmail.com', // sender address
        to: 'majidkorai@yahoo.com', // list of receivers
        subject: 'Inquiry received from majidkorai.com', // Subject line
        html: "e"//`<p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p><p>Subject: ${req.body.subject}</p><p>Message: ${req.body.message}</p>`// plain text body
      };
      transporter.sendMail(mailOptions,  (err, info)=> {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    res.send({ express: JSON.stringify(req.body) });
}); 

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
