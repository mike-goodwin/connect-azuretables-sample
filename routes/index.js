var express = require('express');
var router = express.Router();
var passport = require('passport');

//main page
router.get('/', function (req, res) {
    res.render('index');
});

//login
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), renderWelcome);
  
//success
router.get('/welcome', require('connect-ensure-login').ensureLoggedIn('/'), renderWelcome);
  
//render welcome
function renderWelcome(req, res) {
    res.render('welcome', {username: req.user.name});
}
  
//login
router.post('/logout',
function(req, res) {
    req.logOut();
    //logout does not seem to do much/anything so do it by hand
    res.clearCookie('connect.sid');
    req.session.destroy(function() {
        res.render('index'); 
        });
    }); 
  
module.exports = router;
