const router = require("express").Router()
const {validationResult} = require('express-validator')
const AdminModel = require('../models/Admin')
const AdminS = require('../validator/AdminS.validation')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get('/SAdmin', (req, res) => {
    res.render('SignUp.ejs')
});

router.post("/SAUser", async (req, res) => {
    const newAdmin = new AdminModel({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
       const errors = validationResult(req)
       if (errors.isEmpty()) {
        const userA = await AdminModel.findOne({email})
        if (userA) {
        res.redirect('/SAdmin');
        } else {
            await newAdmin.save();
            res.redirect('/LAdmin');
        }
       } else {
        res.redirect('/SAdmin');
       }
    } catch (err) {
      res.status(200).json({err,status:false});
    }
  });

router.get('/LAdmin', (req, res) => {
    res.render('login.ejs')
});



module.exports = router