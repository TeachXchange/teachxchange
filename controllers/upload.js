const express = require('express');
const Redirect = require('../middlewares/redirect');
const firebase = require("firebase");
const multer = require('multer')
const Storage = require('@google-cloud/storage')
const storage = Storage()
const format = require('util').format;
const path = require('path')

// Set storage Engine
const storageMulter = multer.diskStorage({
  destination: 'uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// Init Upload
const upload = multer({
  storage: multer.memoryStorage()
}).single('file');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn(), this.index);
    router.post('/', Redirect.ifNotLoggedIn(), this.upload);

    return router;
  },
  index(req, res) {
    res.render('upload');
  },
  upload(req, res) {

    const database = firebase.database();
    upload(req, res, (err) => {
      if (err) {
        res.render('upload', {err})
      }
      else {
        
        const uploadFileName = req.file.originalname
        const bucket = storage.bucket("gs://teachxchange-5bff2.appspot.com");
        const blob = bucket.file(uploadFileName + '-' + Date.now());
        const blobStream = blob.createWriteStream();
        console.log(blobStream)
        blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
          const filename = blob.name;
          const childPath = filename.substr(0,filename.lastIndexOf('.')) + '-' + Date.now();
          const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          database.ref(`pictures/${childPath}`).set({
            'inputType': req.body.inputType,
            'uploadedBy': firebase.auth().currentUser.uid,
            'gradeLevel': req.body.gradelevel,
            'subject': req.body.subject,
            'note': req.body.note,
            'publicUrl': publicUrl
          })
          res.status(200).redirect('feed');
        });

        blobStream.end(req.file.buffer);

        


        // const uploadTask = storageRef.child(file.originalname).put(file, uploadsMetadata);
        // return new Promise((resolve, reject) => {
        //   uploadTask.on('state_changed', function(snap) {
        //     console.log('Progress: ', nap.bytesTransferred, '/', snap.totalBytes, ' bytes');

        //     const metadata = uploadTask.snapshot.metadata;
        // const storageRef = firebase.storage().ref().child('Images/' + filename).put(file);

        // uploadTask.on('state_changed'), function(snapshot) {

        // }, function(error){
        //   // unsuccessful upload
        //   console.log("ERROR = " + error);
        // }, function() {
        //     // successful upload
        //     const downloadURL = uploadTask.snapshot.downloadURL;
        //     console.log(downloadURL);
        // }
       
        // const uploadTask = firebase.storage().ref().child('Picture/hackathon.JPG').put(test).then(function(snapshot) {
        //   console.log('Uploaded a blob or file!');
      }
    })
    
    
    
  }

  	
  // 	}

  // 	for (var i = 0, f; f = files[i]; ++i) {
	 //  	var uploadFile = storageRef.child('Picture/' + files[i]).put(files, metadata);

  // 	}


  	
  // }
};
