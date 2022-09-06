const app = require('express').Router()
const {validationResult} = require('express-validator')
const AdminModel = require('../models/Admin')
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


app.get('/SignIn', (req, res) => {
    res.render('SignIn.ejs');
  });
  
  
  app.post('/PageSignIn', async (req, res) => {
    const {email,password}=req.body
    try {
      const user = await AdminModel.findOne({email})
      if (user) {
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
      );
  
  
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      const inputPassword = req.body.password;
      if (originalPassword != inputPassword) {
        res.redirect('/SignIn')
      } else {
        const accessToken = jwt.sign(
          {
              id: user._id,
              isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
              {expiresIn:"3d"}
          );
          console.log(accessToken)
          res.redirect('/Page/Bearer'+' '+accessToken);
      }
      } else {
         res.redirect('/SignIn');
      }
      
    } catch (error) {
      res.json(error)
    }
  });
  
  
  module.exports = app