const fs = require('fs');

const server = require('./server');

const serverInstance = server({
  port: 8643,
  sslKey: fs.readFileSync('C:/MAMP/htdocs/_ssh/localhost/localhost.key'),
  sslCert: fs.readFileSync('C:/MAMP/htdocs/_ssh/localhost/localhost.crt'),
});

serverInstance.start();
