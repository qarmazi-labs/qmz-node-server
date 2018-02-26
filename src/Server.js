const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const Context = require('./Context');

class Server {
  constructor() {
    const context = new Context();
    this.context = context.bootstrap({ testDotEnv: false, testPackageEnv: true });
  }

  getApp() {
    const app = express();
    app.disable('x-powered-by');
    return app;
  }

  startServer(app) {
    const server = http.createServer(app);

    server.on('error', (err) => {
      console.log(err);
    });

    server.listen(this.context.httpPort);
    console.log(`HTTP server running on port ${this.context.httpPort}`);
  }

  startSecureServer(app) {
    const options = {
      key: fs.readFileSync(`/etc/letsencrypt/live/${this.context.httpsPort}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${this.context.httpsPort}/privkey.pem`)
    };

    const server = https.createServer(options, app);

    server.on('error', (err) => {
      console.log(err);
    });

    server.listen(this.context.httpsPort);
    console.log(`HTTPS server running on port ${this.context.httpsPort}`);
  }

  start() {
    const app = this.getApp();

    app.get('*', (req, res) => {
      res.send('Hola Mundo!');
    })
    this.startServer(app);
    this.startSecureServer(app);
  }

  errorHandler(err) {
    throw err;
  }
}

module.exports = Server;
