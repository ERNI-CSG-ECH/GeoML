const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 4000;
const path = require('path');
const fs = require('fs');

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/geo-ml/'));
app.use(express.static('express/resources'));

let sess;
let humanPoints = [];
let botPoints = [];

app.use('/', function (req, res, next) {
  var files = fs
    .readdirSync(path.resolve(__dirname, './resources/api/files'))
    .filter((filename) => filename.indexOf('_result') < 0)
    .map((filename) => filename.replace('_initial.png', ''));
  const randomTasks = [];
  for (let i = 0; i < 5; i++) {
    randomTasks.push(files[Math.floor(Math.random() * files.length)]);
  }
  sess = req.session;
  sess.tasks = randomTasks;
  sess.correct = [4, 1, 2, 2, 1];
  sess.botGuess = [4, 1, 3, 1, 3];
  next();
});

app.get('/', function (req) {
  if (sess) {
    return res.redirect('/app');
  } else {
    res.send(`Session does work.`);
  }
});

app.get('/app', function (req, res) {
  res.sendFile(path.resolve('dist/geo-ml/index.html'));
});

app.get('/api/tasks', function (req, res) {
  if (sess) {
    humanPoints = [];
    botPoints = [];
    res.send({
      sessionId: sess.id,
      values: sess.tasks,
    });
  } else {
    res.send(`Session doesn't work.`);
  }
});

app.post('/api/check', function (req, res) {
  if (sess) {
    const delta = Math.abs(req.body.guess - sess.correct.at(req.body.task));
    const botDelta = Math.abs(sess.botGuess.at(req.body.task) - sess.correct.at(req.body.task));
    humanPoints.push(delta > 4 ? 0 : Math.pow(4 - delta, 2));
    botPoints.push(botDelta > 4 ? 0 : Math.pow(4 - botDelta, 2));
    res.send({
      sessionId: sess.id,
      task: sess.tasks.at(req.body.task),
      correct: sess.correct.at(req.body.task),
      botPoints: botPoints.at(req.body.task),
      humanPoints: humanPoints.at(req.body.task),
    });
  } else {
    res.send(`Session doesn't work.`);
  }
});

app.get('/api/result', function (req, res) {
  if (sess) {
    return res.send({
      sessionId: sess.id,
      tasks: sess.tasks,
      correct: sess.correct,
      botPoints,
      humanPoints,
    });
  } else {
    res.send(`Session does work.`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
