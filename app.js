const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome <br><br> 😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Tassahil Center"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "You are invited! 😃👻😃👻😃👻", // Subject line
    html: `<h2>Hi there ,</h2>
    <h4>Keep learning with our online events and here is the link to join our webinar : http://localhost:4200/#/home</h4>
    <h4>Thank you for joining us,</h4>
    <h3>Regards.</h3>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
