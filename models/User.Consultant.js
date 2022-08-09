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
    Qualification: {
      type: String,
      max: 300
    },
    counseling: {
      type: String,
      max: 30
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
