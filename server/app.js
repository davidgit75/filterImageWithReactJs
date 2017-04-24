const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/dist", express.static(path.join(__dirname, '../client/dist')));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
});


/* Endpoints */
const router = express.Router();

router.get('*', (req, res) => {
  console.log('request get to server');
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(router);

server.listen(process.env.PORT || 3000);

module.exports = app;
