const express = require('express');
const sessions = require('express-session');
const cors = require('cors');

const app = express();
const port = 4000;
const path = require('path');
const oneDay = 1000 * 60 * 60 * 24;

app.use(cors());
app.use(
  sessions({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/geo-ml/'));
app.use(express.static('express/resources'));

app.get('/', function (req) {
  if (req.session.userid) {
    res.sendFile(path.resolve('dist/geo-ml/index.html'));
  } else {
    res.send("Session doesn't work.");
  }
});

app.get('/app', function (req, res) {
  if (req.session.userid) {
    res.sendFile(path.resolve('dist/geo-ml/index.html'));
  } else {
    res.send("Session doesn't work.");
  }
});

app.get('/api/tasks', function (req, res) {
  const values = ['002439', '002440', '002442', '002452', '002462'];
  res.send({ values });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
