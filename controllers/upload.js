const express = require('express');
const Redirect = require('../middlewares/redirect');
const firebase = require("firebase");
const storage = require('firebase/storage')



module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.upload);

    return router;
  },
  index(req, res) {
    res.render('upload');
  },
  upload(req, res) {
  	const storageRef = firebase.storage().ref();
  	const fileType = req.body.inputType;
  	const gradeLevel = req.body.gradelevel; 
  	const subject = req.body.subject;
  	const note = req.body.note;
  	const metadata = {
  		customMetadata: {
  			'inputType': fileType,
  			'uploadedBy': firebase.auth().currentUser.uid,
  			'gradelevel': gradeLevel,
  			'subject': subject,
  			'note': note
  		},

  	}
  	const files = req.body.files;

  	for (var i = 0, f; f = files[i]; ++i) {
	  	var uploadFile = storageRef.child('Picture/' + files[i]).put(files, metadata);

  	}


  	
  }
};
