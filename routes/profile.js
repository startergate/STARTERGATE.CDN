/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/img/:id', (req, res, next) => {
  fs.readFile('public/images/sid/profile/' + req.params.id + '.png', (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      return;
    }

    res.set('Content-Type', 'image/png');
    res.end(data, 'binary');
  });
});

module.exports = router;