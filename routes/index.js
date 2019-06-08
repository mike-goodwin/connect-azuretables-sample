var express = require('express');
var router = express.Router();
var passport = require('passport');

//main page
router.get('/', function (req, res) {
    res.render('index');
});

//login
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/welcome');
});

//welcome
router.get('/welcome', function(req, res) {
    res.render('welcome', {username: req.session.passport.user.name});
});
  
//logout
router.post('/logout',
function(req, res) {
    req.logOut();
    //logout does not seem to do much/anything so do it by hand
    res.clearCookie('connect.sid');
    // req.session.destroy(function() {
    //     res.render('index'); 
    //     });
    req.session.destroy();
    res.render('index'); 
    }); 
  
module.exports = router;
