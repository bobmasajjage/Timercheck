var fs = require('fs');
var express = require('express');
var request = require('request');
var router = express.Router();

// var nodeMailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

// Declare Relative Auth credentials
var CLIENT_ID = 'your client id';
var CLIENT_SECRET = 'client secret';
var REDIRECT_URI = "http://49dedd03.ngrok.com/auth"
var HARVEST_HOST = "https://digitalprocoza.harvestapp.com"

// Write_token help save the token and the refresh token  to credentials.json file 
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
                    console.log('Tokens file updated')
                };
            });
        } catch (err) {
            console.log('Something wiered happened in writing token', err);
        };
    };

// Retrieve token from the credentials Json file
function get_tokens(){
    try {
        var credentials = JSON.parse(fs.readFileSync('./credentials.json'));
        if (credentials === false) {
            console.log(" No Tokens found");
        }
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

// Token expires but has a refresh code that we use here to ask for a new token again
function refreshToken(refresh_code) {
    var options = {
        url:HARVEST_HOST+"/oauth2/token",
        method:'POST',
        formData: {
            refresh_token: refresh_code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "refresh_token"
        },

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
    };

    function callBack(err, response, body){
        if (!err && response.statusCode == 200 ) {
            var data  = JSON.parse(body);
            write_token(data);
        } else {
            console.log('refresh Token Call failed with error:', err);
        };
    };

    // Trigger an HTTP call
    try {
        request(options, callBack);
    } catch (err) {
        console.log('refresh call failed with error: ', err);
    };

};

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
    var data = get_tokens();
    if ( data === {} || data == false ) {
        res.redirect('/')
    };
    
    console.log(data);

    try  {
        res.render('_response',  function(err){
            if (err) {
                console.log('Error in authenticated', err)
            };
        });

    } catch (e) {
        console.log('rendering _response fiale in /authenticated with error: ', err);
    };
});

router.get('/refresh', function(req, res, next){
    console.log(' Refresh Block');
    try {
        var tokens = get_tokens();
        console.log(tokens);
        var refresh_tkn = tokens.refreshToken;
        console.log(refresh_tkn);
        refreshToken(refresh_tkn);
        res.redirect('/authenticated');

    } catch (err) {
        console.log('refresh failed with Error: ', err);
    };
});

router.get('/team', function(req, res, next) {

    var credentials = get_tokens();
    var auth_token = credentials.token;
    var self = this;
    var members = {};

    var options = {
        url:HARVEST_HOST+"/reports#client",
        method:'GET',
        formData: {
            access_token: auth_token
        },

        headers: {
            "Accept": "application/json"
        }
    };

    function callBack(err, response, body){
        if (!err && response.statusCode == 200 ) {
            var data  = JSON.parse(body);
            console.log('getting people server response: ', data);
        } else {
            console.log('requesting harvest people failed with error:', err);
        };
    };

    // Trigger an HTTP call
    try {
        request(options, callBack);
    } catch (err) {
        console.log('calling /team failed with error: ', err);
    };
});

router.get('/who', function(req, res, next){
    var credentials = get_tokens();
    var auth_token = credentials.token;
    var myaccount= {};

    var options = {
        url:HARVEST_HOST+"/daily",
        method:'GET',
        formData: {
            access_token: auth_token
        },

        headers: {
            "Accept": "application/json"
        }
    };

    function callBack(err, response, body){
        if (!err && response.statusCode == 200 ) {
            var data  = JSON.parse(body);
            console.log('getting who_i_am server response: ', data);
        } else {
            console.log('requesting harvest who-iam failed with error:', err);
        };
    };

    // Trigger an HTTP call
    try {
        request(options, callBack);
    } catch (err) {
        console.log('calling who-iam failed with error: ', err);
    };
});
 
module.exports = router;