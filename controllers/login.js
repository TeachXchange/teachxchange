const express = require('express');
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');
const firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqOTTVTYQGWk-F2SIPrV8OmCX0Jq7ESro",
  authDomain: "teachxchange-5bff2.firebaseapp.com",
  databaseURL: "https://teachxchange-5bff2.firebaseio.com",
  projectId: "teachxchange-5bff2",
  storageBucket: "teachxchange-5bff2.appspot.com",
  messagingSenderId: "388508996760"
};
firebase.initializeApp(config);

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifLoggedIn('feed'), this.index);
    router.post('/', this.login);
    router.get('/reset', this.reset);
    router.post('/reset', this.resetPassword);

    return router;
  },
  index(req, res) {
    res.render('login', { error: req.flash('error') });
  },
  login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then( user =>  {res.redirect('feed'); })
      .catch(error => { 
        res.redirect('login', {error}); 
      });
    // passport.authenticate('local', {
    //   successRedirect: '/profile',
    //   failureRedirect: '/login',
    //   failureFlash: true,
    //   successFlash: true,
    // })(req, res);
  },
  reset(req, res) {
    res.render('login/reset', {error: req.flash('error')});
  },
  resetPassword(req, res) {
    firebase.auth().sendPasswordResetEmail(req.body.email).then(function() {
      // Email sent.
      res.redirect('login');
    }).catch(function(error) {
      // An error happened.
    });
  }
};
