var express = require('express');
var router = express.Router();
// var nodeMailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');


// Declare Relative Auth credentials
// var CLIENT_ID = '';
// var CLIENT_SECRET = '';
// var HARVEST_HOST = '';
// var REDIRECT_URI = '';


router.get("https://digitalprocoza.harvestapp.com/oauth2/authorize?client_id=NMBEWl3h0r4KKNhfOsmPJw%3D%3D&redirect_uri=https%3A%2F%2Fexample.com%2Fredirect_path&state=optional-csrf-token&response_type=code", function(req, res, next){

	console.log(res);
});


module.exports = router;
