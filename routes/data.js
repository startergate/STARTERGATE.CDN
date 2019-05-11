/*jshint esversion: 9 */

const express = require('express');
const fs = require('fs');
const router = express.Router();

const ds_token = JSON.parse(fs.readFileSync('private/data/discord/bot.json'));
const db_password = JSON.parse(fs.readFileSync('private/data/db/access.json'));

router.get('/discord/token/:id', (req, res, next) => {
  if (ds_token.data[req.params.id]) {
    if (req.ip in ds_token.data[req.params.id].allowed_ip || req.ip === '::1') {
      res.set('Content-Type', 'text/plain');
      res.send(ds_token.data[req.params.id].discord_token.toString());
      return;
    }
  }
  res.sendStatus(404);
});

router.get('/db/mysql/:id', (req, res, next) => {
  if (db_password.data[req.params.id]) {
    if (req.ip in db_password.data[req.params.id].allowed_ip || req.ip === '::1') {
      res.set('Content-Type', 'text/plain');
      res.send(db_password.data[req.params.id].db_password);
      return;
    }
  }
  res.sendStatus(404);
});

module.exports = router;