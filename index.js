const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http")
const server = http.createServer(app);
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authURoute = require("./routes/authU");
const authCRoute = require("./routes/authC");
const authRoute = require("./routes/auth");
const payments = require('./routes/payment')
const resetPassword = require("./routes/resetPassword")
const changepass = require('./routes/changepass')
const payRoute = require('./routes/pay')
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const Pagecontrol = require('./routes/Pagecontrol')
const SignUp = require('./routes/SignUp')
const SignIn = require('./routes/SignIn')
const stripeRoute = require("./routes/stripe");
const router = express.Router();
const path = require("path");
const cors = require("cors");
const Consultant = require("./models/User.Consultant");
var session = require('express-session')
var flash = require('connect-flash');
const{initMeetingServer}= require("./meeting-server")

const passport = require('passport');
var userProfile;


initMeetingServer(server);
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));


dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use( express.static(path.join(__dirname, "public")));

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
app.post("/api/upload/:id", upload.single("file"),async (req, res) => {
  try {
    console.log(req.file.path)
    const updatedUser = await Consultant.findByIdAndUpdate(
      req.params.id,
      {
        $set:
        {
          file:'https://consultant1.herokuapp.com/images/'+req.file.filename,
        },
      },
      { new: true }
    );
    return res.status(200).json({message:"File uploded successfully",updatedUser,status:true});
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/upload1/:id",upload.single("photo"), async (req, res) => {
  try {
    console.log(req.file.path)
    const updatedUser1 = await Consultant.findByIdAndUpdate(
      req.params.id,
      {
        $set:
        {
          photo:'https://consultant1.herokuapp.com/images/'+req.file.filename,
        },
      },
      { new: true }
    );
    return res.status(200).json({message:"File uploded successfully",updatedUser1,status:true});
  } catch (error) {
    console.error(error);
  }
});




app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.json({message:"true"}));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



app.use(cors());
app.use(flash());
app.use("/api/authU", authURoute);
app.use("/api/authC", authCRoute);
app.use("/api/users", userRoute);
app.use("/api/pay", payRoute);
app.use(authRoute);
app.use("/api",payments)
app.use("/api",require("./routes/app"));
app.use(SignUp);
app.use(SignIn);
app.use(Pagecontrol);
app.use("/api/Rpass",resetPassword);
app.use(changepass);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/checkout", stripeRoute);

server.listen(process.env.PORT||5000, () => {
  console.log("Backend server is running!");
});
