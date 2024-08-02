const express = require('express');
const cors = require('cors');
const User = require('./server/model/user.model');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to backend journey');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post('/users', async (req, res) => {
  console.log('req', req.body);
  User.create({
    task: req.body,
  })
    .then((result) => console.log('result', result))
    .catch((err) => console.log('err', err));
});

module.exports = app;
