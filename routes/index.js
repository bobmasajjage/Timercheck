var express = require('express');
var router = express.Router();
// var nodeMailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index.jade', { title: 'Home Page' });
});

/*GET the Contacts page*/

router.get('/contacts', function(req, res, next){
      res.render('pages/contacts', {title:'testing'});

});

router.get('/thanks', function(req, res, next){
  res.render('pages/thanks', {title:'Someother title'})
});

module.exports = router;
