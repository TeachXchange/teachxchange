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
    res.render('sign-up');
  },
  submit(req, res) {
    const firstName = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => { })
      .catch(e => console.log(e.message));
  },
};
