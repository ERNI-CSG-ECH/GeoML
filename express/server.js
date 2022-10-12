const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 4000;
const path = require('path');
const fs = require('fs');

const resultsJson = require('./resources/api/result.json');

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/geo-ml/'));
app.use(express.static('express/resources'));

let sess;
let humanPoints = [];
let botPoints = [];
let results = {};
let randomTasks = [];

app.use('/', async function (req, res, next) {
  try {
    if (randomTasks.length !== 5) {
      resultsJson.forEach((result) => {
        results[result.name] = { correct: result.correct, botGuess: result.botGuess };
      });

      for (let i = 0; i < 5; i++) {
        randomTasks.push(Object.keys(results)[Math.floor(Math.random() * Object.keys(results).length)]);
      }
      sess = req.session;
      sess.tasks = randomTasks;
      sess.correct = [
        results[randomTasks[0]].correct,
        results[randomTasks[1]].correct,
        results[randomTasks[2]].correct,
        results[randomTasks[3]].correct,
        results[randomTasks[4]].correct,
      ];
      sess.botGuess = [
        results[randomTasks[0]].botGuess,
        results[randomTasks[1]].botGuess,
        results[randomTasks[2]].botGuess,
        results[randomTasks[3]].botGuess,
        results[randomTasks[4]].botGuess,
      ];
    }

    next();
  } catch (ex) {
    res.send('Error: ' + ex + '\n' + randomTasks + '\n' + JSON.stringify(results));
  }
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

app.post('/app/reset', function (req, res) {
  randomTasks = [];
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
      correct: parseInt(sess.correct.at(req.body.task)),
      botPoints: botPoints.at(req.body.task),
      humanPoints: humanPoints.at(req.body.task),
    });
  } else {
    res.send(`Session doesn't work.`);
  }
});

app.get('/api/result', function (req, res) {
  if (sess) {
    randomTasks = [];
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
