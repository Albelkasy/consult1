const app = require('express').Router()
const {validationResult} = require('express-validator')
const AdminModel = require('../models/Admin')
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

app.get('/', (req, res) => {
     res.render('register.ejs');
});

//REGISTER
app.post("/register", async (req, res) => {
    
    const newAdmin = new AdminModel({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  const {email} = req.body
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        const Admin = await AdminModel.findOne({email})
        if (Admin) {
            res.redirect('/');
        } else {
            await newAdmin.save();
            res.redirect('/login');
        }
      } else {
        res.redirect('/');
      }
    } catch (err) {
       res.redirect('/');
    }
});


module.exports = app