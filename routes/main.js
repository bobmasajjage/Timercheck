var fs = require('fs');
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

// Write_token help save the token and the refresh token 
function write_token (dataObject) {
		var data = {
			token: dataObject.access_token,
			refreshToken: dataObject.refresh_token
		};

		var tokenFile = './credentials.json';

		try {
			fs.writeFile(tokenFile, JSON.stringify(data, null, 4), function(err) {
				if (err){
					console.log('something went wrong in write token: ', err);
				} else {
					console.log('Files updated')
				};
			});
		} catch (err) {
			console.log('Something wiered happened in writing token', err);
		};
	};


function get_token(){
	try {
		var credentials = JSON.parse(fs.readFileSync('./credentials.json'));
		return credentials;

	} catch (err) {

		console.log('failed to load credentials', err);
	}
};

router.get('/', function(req, res, next) {
	return res.render('index');
});

router.get('/redireect_to_harvest', function(req, res, next){
	res.redirect(HARVEST_HOST + "/oauth2/authorize?client_id=" + CLIENT_ID+"&redirect_uri=" + REDIRECT_URI + "&state=optional-csrf-token&response_type=code");
});

router.get('/auth', function(req, res, next) {

	var options = {
		url:HARVEST_HOST+"/oauth2/token",
		method:'POST',
		formData: {
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
			var data  = JSON.parse(body)
			write_token(JSON.parse(body));
			res.redirect('/authenticated')

		} else {
			console.log('Call failed with error:', err);
		};
	};

	// Trigger an HTTP call
	try {
		request(options, callBack);
	} catch (err) {
		console.log(err);
	};

}); // end of /auth

router.get('/authenticated', function(req, res, next) {
	var data = get_token();
	if ( data === {} || data == false ) {
		res.redirect('/')
	};
	// console.log(data);
	res.render('_response',  function(err){
		if (err) {
			console.log('Error in authenticated', err)
		};
	});

});

router.get('/team', function(req, res, next) {

})
 
module.exports = router;