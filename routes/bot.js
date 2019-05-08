/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs')
const router = express.Router();

const ds_token = fs.readFileSync('private/data/discord/bot.json');

/* GET home page. */
router.get('/token/:id', (req, res, next) => {
  if (ds_token.data[req.params.id]) {
    res.set('Content-Type', 'text/plain');
    res.send(ds_token.data[req.params.id]);
    return;
  }
  res.sendStatus(404)
});

module.exports = router;