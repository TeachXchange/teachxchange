const express = require('express');
const firebase = require('firebase');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.logout);

    return router;
  },
  logout(req, res) {

    firebase.auth()
    	.signOut()
    	.then(() => res.redirect('landing'))
  },
};
