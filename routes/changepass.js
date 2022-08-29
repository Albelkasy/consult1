const router = require('express').Router()
const { validationResult } = require('express-validator')
const consultant =require('../models/User.Consultant')

router.get('/changepass/:id', async (req, res) => {
  res.render('changepass.ejs')
});

router.post("/:id", async (req, res) => {
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
          password:req.body.newpass
        },
        { new: true }
      );
    res.status(200).json({ updatedUser, status: true });
    }else{
    res.status(200).json({ message:"err in validation", status: false });
    }
  } catch (err) {
    res.status(200).json({ err, status: false });
  }
});

module.exports = router