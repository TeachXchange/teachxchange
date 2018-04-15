const express = require('express');
const Redirect = require('../middlewares/redirect');
const firebase = require('firebase')
var admin = require("firebase-admin");


module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);

    return router;
  },
  index(req, res) {
  	var db = firebase.database();
	var ref = db.ref("/pictures/");
	ref.on("value", function(snapshot) {
		const posts = snapshot.val();
		console.log(posts)
		res.render('feed', {posts});
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
    
  },
};
