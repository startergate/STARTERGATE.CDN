/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/profile/img/:id', (req, res, next) => {
  fs.readFile('../public/images/profile/' + req.params.id + '.png', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404);
      return;
    }

    res.set('Content-Type', 'image/' + something);
    res.send(data);
  });
});

module.exports = router;