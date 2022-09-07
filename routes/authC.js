const router = require("express").Router();
const User = require("../models/User.Consultant");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    FCM_TOKEN:req.body.FCM_TOKEN
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({savedUser,status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});




//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({updatedUser,status:true});
  } catch (err) {
    res.status(200).json(err);
  }
});
//LOGIN

router.post('/login', async (req, res) => {
  const {email,password}=req.body
  try {
    const user = await User.findOne({email})
    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    const inputPassword =password;
    if (originalPassword != inputPassword) {
      res.status(200).json({message:"Wrong Password",status:false});
    } else {
      const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken,status:true});
    }
    } else {
       res.status(200).json({message:"Wrong User email",status:false});
    }
    
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

module.exports = router;
