const express = require('express');
const Redirect = require('../middlewares/redirect');
const firebase = require("firebase");
const multer = require('multer')
const Storage = require('@google-cloud/storage')
const storage = Storage()
const format = require('util').format;

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

    router.get('/', this.index);
    router.post('/', this.upload);

    return router;
  },
  index(req, res) {
    res.render('upload');
  },
  upload(req, res) {
    upload(req, res, (err) => {
      if (err) {
        res.render('upload', {err})
      }
      else {
        const bucket = storage.bucket("gs://teachxchange-5bff2.appspot.com");
        const blob = bucket.file(req.file.originalname);
        const user = firebase.auth().currentUser;
        if (user) {
          console.log("User is logged in")
        }
        else {
          console.log("ARGGANSDFAKSFDAKFBDA")
        }
        const blobStream = blob.createWriteStream();


         blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
          res.status(200).send(publicUrl);
        });

        blobStream.end(req.file.buffer);


        // const storageRef = storage.ref('uploads/');
        // const uploadsRef = firebase.database().ref('uploads/'); 
        // const file =  req.file;  
        // const uploadsMetadata = {
        //   customMetadata: {
        //     'inputType': fileType,
        //     'uploadedBy': firebase.auth().currentUser.uid,
        //     'gradelevel': gradeLevel,
        //     'subject': subject,
        //     'note': note
        //  }

        // }
        // const uploadTask = storageRef.child(file.originalname).put(file, uploadsMetadata);
        // return new Promise((resolve, reject) => {
        //   uploadTask.on('state_changed', function(snap) {
        //     console.log('Progress: ', nap.bytesTransferred, '/', snap.totalBytes, ' bytes');

        //   }, function(err) {
        //     console.log('upload error', err);
        //     reject(err);
        //   }, function() {
        //     const metadata = uploadTask.snapshot.metadata;

        //   })
        // })

       
        // const filename = req.file.originalname;
        // console.log(typeof(req.file))
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

        // }).catch((err) => console.log(err))
        //res.send('test')
      }
    })
    
    // const fileType = req.body.inputType;
    // const gradeLevel = req.body.gradelevel; 
    // const subject = req.body.subject;
    // const note = req.body.note;
    
    
  }

  	
  // 	}

  // 	for (var i = 0, f; f = files[i]; ++i) {
	 //  	var uploadFile = storageRef.child('Picture/' + files[i]).put(files, metadata);

  // 	}


  	
  // }
};
