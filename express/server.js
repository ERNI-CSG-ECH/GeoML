const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 4000;
const path = require('path');
const fs = require('fs');
const parse = require('csv-parse').parse;

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/geo-ml/'));
app.use(express.static('express/resources'));

/* type tableRow {
      id: number,
      vehicles_per_day: number,
      strassen_laenge: number,
      Unfaelle_todesfolge,
      Unfaelle_schwer,
      Unfaelle_leicht,
      real_labels_print,
      cnn_prediction,
      x_coord_print,
      y_coord_print
} */

let sess;
let humanPoints = [];
let botPoints = [];
let results /* {[id: number]: tableRow} */ = {};
let randomTasks = [];

const loadResultTable = function (req, res) {
  const data = fs.readFileSync(path.resolve('express/resources/data/master_file.csv'));
  parse(data, (err, records) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ success: false, message: 'An error occurred' });
    }

    const attributes = records[0][0].split(';');
    for (let i = 1; i < records.length; i++) {
      const splitRecord = records[i][0].split(';');
      const mapped /* :tableRow */ = {};
      for (let j = 0; j < attributes.length; j++) {
        mapped[attributes[j]] = splitRecord[j];
      }
      results[mapped.id] = {
        correct: parseInt(mapped.real_labels_print) + 1,
        botGuess: parseInt(mapped.cnn_prediction) + 1,
        information: {
          cars: parseInt(mapped.vehicles_per_day),
          // TODO excel replaced floats with dates
          streetLength: parseFloat(parseFloat(mapped.strassen_laenge).toFixed(3)),
          accidentLethal: parseInt(mapped.Unfaelle_todesfolge),
          accidentSever: parseInt(mapped.Unfaelle_schwer),
          accidentLight: parseInt(mapped.Unfaelle_leicht),
          xCoords: parseFloat(mapped.x_coord_print),
          yCoords: parseFloat(mapped.y_coord_print),
        },
      };
    }

    randomTasks = [];
    for (let i = 0; i < 5; i++) {
      const randomIdx = Math.floor(Math.random() * Object.keys(results).length);
      randomTasks.push(Object.keys(results)[i]);
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
    sess.information = [
      results[randomTasks[0]].information,
      results[randomTasks[1]].information,
      results[randomTasks[2]].information,
      results[randomTasks[3]].information,
      results[randomTasks[4]].information,
    ];

    return;
  });
};

app.use('/', async function (req, res, next) {
  if (sess && !sess.finished) {
    randomTasks = sess.tasks;
  } else {
    loadResultTable(req, res, next);
  }

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

app.post('/app/reset', function (req, res) {
  sess.finished = true;
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
      botGuess: sess.botGuess.at(req.body.task),
      botPoints: botPoints.at(req.body.task),
      humanPoints: humanPoints.at(req.body.task),
    });
  } else {
    res.send(`Session doesn't work.`);
  }
});

app.get('/api/result', function (req, res) {
  if (sess) {
    sess.finished = true;
    return res.send({
      sessionId: sess.id,
      tasks: sess.tasks,
      correct: sess.correct,
      botGuess: sess.botGuess,
      botPoints,
      humanPoints,
    });
  } else {
    res.send(`Session does work.`);
  }
});

app.get('/api/information/:task', function (req, res) {
  if (sess) {
    return res.send(sess.information.at(parseInt(req.params.task)));
  } else {
    res.send(`Session does work.`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
