const app = require('express').Router()
const conslutant = require('../models/User.Consultant')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken.params");

app.get('/page/:token',verifyTokenAndAdmin, async (req, res) => {
    const consultant = await conslutant.find()
    res.render('PageControl.ejs',{consultant})
});

app.post('/', (req, res) => {
    
});

module.exports = app