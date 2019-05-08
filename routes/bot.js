/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
const router = express.Router();

const ds_token = JSON.parse(fs.readFileSync('private/data/discord/bot.json'));

/* GET home page. */
router.get('/token/:id', (req, res, next) => {
  if (ds_token.data[req.params.id]) {
    if (req.ip in ds_token.data[req.params.id].allowed_ip || req.ip === '::1') {
      res.set('Content-Type', 'text/plain');
      res.send(ds_token.data[req.params.id].discord_token.toString());
      return;
    }
  }
  res.sendStatus(404);
});

module.exports = router;