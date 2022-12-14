const User = require("../models/User.user");
const consultant = require("../models/User.Consultant");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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
    res.status(200).json({err,status:false});
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"User has been deleted...",status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

//GET USER
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({others,status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

router.get("/find1/:id", verifyToken, async (req, res) => {
  try {
    const consultants = await consultant.findById(req.params.id);
    const { password, ...others } = consultants._doc;
    res.status(200).json({others,status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

//GET ALL USER
router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({users,status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

router.get("/consultant", verifyToken, async (req, res) => {
  const query = req.query.new;
  try {
    const consultants = query
      ? await consultant.find().sort({ _id: -1 }).limit(5)
      : await consultant.find();
    res.status(200).json({consultants,status:true});
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

//GET USER STATS

router.get("/stats", verifyToken, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({data,status:true})
  } catch (err) {
    res.status(200).json({err,status:false});
  }
});

module.exports = router;