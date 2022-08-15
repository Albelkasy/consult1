const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const passport = require("passport");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const authURoute = require("./routes/authU");
const authCRoute = require("./routes/authC");
const fcm = require('./routes/notification')
const payRoute = require('./routes/pay')
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const stripeRoute = require("./routes/stripe");
const router = express.Router();
const path = require("path");
const paypal = require('paypal-rest-sdk');
const cors = require("cors");
const Consultant = require("./models/User.Consultant");

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null,Date.now()+"-"+Math.random()*100+file.originalname);
  },
});

const upload = multer({ dest:"public/images", storage });
app.post("/api/upload/:id", upload.single("file"), upload.single("photo"), async (req, res) => {
  try {
    console.log(req.file.path)
    const updatedUser = await Consultant.findOneAndUpdate(
      req.params.id,
      {
        $set:
        {
          file:req.file.path,
          photo:req.file.path
        },
      },
      { new: true }
    );
    return res.status(200).json({message:"File uploded successfully",updatedUser,status:true});
  } catch (error) {
    console.error(error);
  }
});

app.use(cors());

app.use("/api/authU", authURoute);
app.use("/api/authC", authCRoute);
app.use("/api/users", userRoute);
app.use("/api/pay", payRoute);
app.use("/auth", authRoute);
app.use(fcm);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT||5000, () => {
  console.log("Backend server is running!");
});
