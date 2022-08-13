const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    price:{
      type:String,
      max:100
    },
    service:{
      type:Number,
      min:0
    },
    Qualification: {
      type: String,
      max: 300
    },
    counseling: {
      type: String,
      max: 30
    },
    rating:{
      type:Number,
      min:0,
      max:6
    },
    clinet:{
      type:Number,
      min:0
    },

    profilePicture: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      max: 30
    },
    CVPhoto: {
      type: String,
      default: "",
    },
    About: {
      type: String,
      max: 50,
    },
    country: {
      type: String,
      max: 50,
    },
    phone: {
      type: Number,
      max: 50
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultant", ConsultantSchema);
