/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
var router = express.Router();

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
  fs.writeFile('public/images/sid/profile/' + req.params.id + '.png', req.body, err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  });
});

module.exports = router;