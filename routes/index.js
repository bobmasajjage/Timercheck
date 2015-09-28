var express = require('express');
var router = express.Router();
// var nodeMailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');


// Declare Relative Auth credentials
var CLIENT_ID      = 'r8KnxFIeOcDQ9RHsZ2qrEg';
var CLIENT_SECRET  = 'uC9iW4YBQp1_oSz8b8hIsn7IDfC6DGT8XLkuvuet4DXvqSMwupFexjZJgIh4XwDlDre9zogHsi-XhXMAF1C43Q';
var HARVEST_HOST   = 'https://digitalprocoza.harvestapp.com';
var REDIRECT_URI   = '' 


router.get('/auth', function(req, res, next){

	res.redirect(HARVEST_HOST+'/oauth2/authorize?client_id='+CLIENT_ID+'&redirect_uri='+REDIRECT_URI+'&state=optional-csrf-token&response_type=code');
  console.log(res);
});


router.get('/oauth_redirect', function(req, res, next){
	options = {
		indentifier:CLIENT_ID,
		secret:CLIENT_SECRET,
		redirect_uri:REDIRECT_URI,
		grant_type:"authorization_code",
		"Content-Type":"application/x-www-form-urlencoded",
		"Accept":"application/json"
	}
});

router.post(HARVEST_HOST + "/oauth2/token", function(req, res, next){

});

module.exports = router;
