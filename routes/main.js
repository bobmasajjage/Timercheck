var express = require('express');
var request = require('request');
var router = express.Router();
// var nodeMailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');


// Declare Relative Auth credentials
var CLIENT_ID = 'r8KnxFIeOcDQ9RHsZ2qrEg';
var CLIENT_SECRET = 'uC9iW4YBQp1_oSz8b8hIsn7IDfC6DGT8XLkuvuet4DXvqSMwupFexjZJgIh4XwDlDre9zogHsi-XhXMAF1C43Q';
var REDIRECT_URI = "http://49dedd03.ngrok.com/auth"
var HARVEST_HOST = "https://digitalprocoza.harvestapp.com"



router.get('/', function(req, res, next){
	return res.render('index');
});


router.get('/redireect_to_harvest', function(req, res, next){
	res.redirect(HARVEST_HOST + "/oauth2/authorize?client_id=" + CLIENT_ID+"&redirect_uri=" + REDIRECT_URI + "&state=optional-csrf-token&response_type=code");
});

router.get('/auth', function(req, res, next) {

	var options = {
		url:HARVEST_HOST+"/oauth2/token",
		method:'POST',
		json:true,
		body: {
			code: req.query.code,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			redirect_uri: REDIRECT_URI,
			grant_type: "authorization_code"
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Accept": "application/json"
		}
	};
	function callBack(err, response, body){
		if (!err && response.statusCode == 200 ) {
			console.log('Server Response: ', body);
		} else {
			console.log('Call failed with error:', err);
		};

	};
	request(options, callBack); // Triggers the call
}); // end of /auth


router.get('/authenticated', function(req, res, next){
	res.render('_response', {})
});


module.exports = router;