var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  // let body = [];
  // req.on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  // });
  fs.writeFileSync("../server/public/" + req.query.filename, req.body.content);
  res.send('');
  res.end();
// res.render('index', { title: 'Express' });
});

module.exports = router;
