const router = require('express').Router()
const consultant =require('../models/User.Consultant')

router.get('/changepass/:id', async (req, res) => {
  res.render('changepass.ejs')
});

router.post("/", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
      const updatedUser = await consultant.findByIdAndUpdate(
        req.params.id,
        {
          password:req.body.newpass
        },
        { new: true }
      );
    res.status(200).json({ updatedUser, status: true });
  } catch (err) {
    res.status(200).json({ err, status: false });
  }
});

module.exports = router