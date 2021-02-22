const nodemailer = require("nodemailer");
const config = require("../config/config"); 

const mail = async (username, email) => {

  const transporter = nodemailer.createTransport({
    host: config.hostMail,
    port: config.portMail,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
  });


  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Your Forms" <'+ config.user +'>', 
    to: email, 
    subject: "Hello "+ username +"!. Welcome to your forms! ✔",
    text: "Congratulations your registration in your forms was successful! \nstart creating your forms without limits!\n\nAutors: Clemente and Heberto"
  });
}

module.exports = {
  mail
};