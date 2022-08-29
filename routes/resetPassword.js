const router = require('express').Router()
const consultant = require('../models/User.Consultant')
const nodemailer = require('nodemailer')

router.post('/reset',async (req, res) => {
const {email} = req.body
try {
  const user = await consultant.findOne({email})
  if (user) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service:"gmail",
      secure: false, // true for 465, false for other ports
      auth: {
        user: "albelkasy697901@gmail.com", // generated ethereal user
        pass: "omblhbcxslcbuttq", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: 'albelkasy697901@gmail.com', // sender address
      to:email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<a href='https://consultant1.herokuapp.com/changepass/${user._id}'>resetPassword</a>`, // html body
    });
    res.status(200).json({message:"success",status:true})
  } else {
    res.status(200).json({message:"not found email",status:false})
  }
} catch (error) {
    res.status(200).json(error)
}
});


module.exports = router