/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
const multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/sid/profile/");
  },
  filename: function(req, file, cb) {
    cb(null, req.params.id + '.' + file.mimetype.split('/')[1]);
  }
});
var upload = multer({
  storage: storage
}).single('profileImg');

router.get('/img/:id', (req, res, next) => {
  fs.readFile('public/images/sid/profile/' + req.params.id + '.png', (err, data) => {
    if (err) {
      fs.readFile('public/images/sid/profile/default.png', (err, data) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.set('Content-Type', 'image/png');
        res.end(data, 'binary');
      });
      return;
    }
    res.set('Content-Type', 'image/png');
    res.end(data, 'binary');
  });
});

router.post('/img/:id/upload', (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return res.sendStatus(500);
    }
    if (req.body.redirectTo) {
      res.redirect(req.body.redirectTo);
    }
    return res.sendStatus(201);
  });
});

module.exports = router;