const nodemailer = require("nodemailer");

const main = async (email) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'your.forms.v01@gmail.com',
      pass: 'qwcq hhgu dqar brgn'
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Your Forms" <your.forms.v01@gmail.com>', 
    to: email, 
    subject: " welcome to your forms! ✔",
    text: "Congratulations your registration in your forms was successful! \nstart creating your forms without limits!"
  });
}

module.exports = {
    main
};