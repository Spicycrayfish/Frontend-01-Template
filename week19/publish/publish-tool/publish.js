const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

var archiver = require('archiver');

// const postData = querystring.stringify({
//   'content': 'Hello world, this is tank'
// });

let packname = './package';
// fs.stat(packname, (err, stat) => {
  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });


  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory(packname, false);
  archive.finalize();
  archive.pipe(req);

  archive.on('end', () => {
    req.end();
  })

  // let readStream = fs.createReadStream(packname);
  // readStream.pipe(req);
  // readStream.on('end', () => {
  //   req.end();
  // })

  // req.write(postData);
// });


