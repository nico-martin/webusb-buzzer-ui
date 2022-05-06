const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

module.exports = ({
  port = 3000,
  srcDir = '/src/',
  distDir = './public',
  sslKey = '',
  sslCert = '',
}) => {
  const determineContentType = (extension) => {
    const map = {
      css: 'text/css',
      js: 'text/javascript',
      html: 'text/html',
      plain: 'text/plain',
    };

    if (extension in map) {
      return map[extension];
    } else {
      return map.plain;
    }
  };

  const isModuleRequest = (request) => {
    const referer = request.headers.referer;

    if (!referer) {
      return false;
    } else {
      return referer.includes(srcDir);
    }
  };

  const getPath = (request) => {
    const parsedUrl = url.parse(request.url);

    if (isModuleRequest(request)) {
      return `${distDir}${parsedUrl.pathname}.js`;
    } else {
      if (parsedUrl.pathname === '/') {
        return `${distDir}${parsedUrl.pathname}index.html`;
      } else {
        return `${distDir}${parsedUrl.pathname}`;
      }
    }
  };

  const requestHandler = (request, response) => {
    console.log(`${request.method} ${request.url}`);

    if (request.url === '/favicon.ico') {
      response.statusCode = 404;
      response.end();
      return;
    }

    const filePath = getPath(request);
    const extension = path.parse(filePath).ext.replace('.', '');
    const contentType = determineContentType(extension);

    fs.readFile(filePath, (error, fileData) => {
      if (error) {
        console.error(error);
        response.statusCode = 500;
        response.end('There was an error getting the request file.');
      } else {
        response.setHeader('Content-Type', contentType);
        response.end(fileData);
      }
    });
  };

  return {
    start: () =>
      sslKey && sslCert
        ? https
            .createServer({ key: sslKey, cert: sslCert }, requestHandler)
            .listen(port, () => {
              console.log(`HTTPS Server Listening on port ${port}`);
            })
        : http.createServer(requestHandler).listen(port, () => {
            console.log(`HTTP Server Listening on port ${port}`);
          }),
  };
};
