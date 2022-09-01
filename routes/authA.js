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

app.get('/login', (req, res) => {
  res.render('login.ejs');
});


app.post('/Pagelogin', async (req, res) => {
  const {email,Password}=req.body
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
      res.redirect('/login')
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
       res.redirect('/login');
    }
    
  } catch (error) {
    res.json(error)
  }
});


module.exports = app