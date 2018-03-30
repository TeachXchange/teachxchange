const express = require('express');
const models = require('../models');
const firebase = require("firebase");



module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.submit);

    return router;
  },
  index(req, res) {
    res.render('sign-up', { error: req.flash('error') });
  },
  submit(req, res) {
    const firstName = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => { 
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).set({
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          email: req.body.email,
          subject: req.body.subject,
          gradelevel: req.body.gradelevel,
          state: req.body.state
        })
        res.redirect('feed')
      })
      .catch(error =>res.render('sign-up', {error}) );




  },
};
