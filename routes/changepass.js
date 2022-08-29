const router = require('express').Router()
const { validationResult } = require('express-validator')
const consultant =require('../models/User.Consultant')
const CryptoJS = require("crypto-js");
const validation = require('../validator/settings.validation')

router.get('/changepass/:id', async (req, res) => {
  const {id} = req.params
  const findC = await consultant.findOne({_id:id})
  res.render('changepass.ejs',{findC,errors:req.flash('errors')})
});

router.post("/:id",validation, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  const error = validationResult(req)

  try {
    if (error.isEmpty()) {
      const updatedUser = await consultant.findByIdAndUpdate(
        req.params.id,
        {
          password:req.body.password
        },
        { new: true }
      );
     res.redirect(`/changepass/${updatedUser._id}`)
    }else{
    req.flash('errors',error.array())
    res.status(200).json(`/changepass/${updatedUser._id}`);
    }
  } catch (err) {
    res.status(200).json({ err, status: false });
  }
});

module.exports = router