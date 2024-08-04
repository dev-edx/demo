const express = require('express');
const cors = require('cors');
const UserModel = require('./server/model/user.model');
const app = express();

// Middleware to parse the JSON bodies
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to backend journey');
});

app.get('/users', async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

app.post('/users', async (req, res) => {
  const { body } = req;
  try {
    let uniqueUser = await UserModel.findOne({
      $or: [{ email: body.email }, { name: body.name }],
    });
    if (uniqueUser.length && uniqueUser) {
      res.status(400).json('Name or Email already exists');
    } else {
      const user = await UserModel.create(body);
      if (user) {
        res.status(201).json({
          status: 200,
          message: `Welcome ${user.name}`,
          user: user,
        });
      } else {
        res.status(400).send('Please try again later');
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let deletedUserData = await UserModel.findByIdAndDelete(id);
    if (deletedUserData) {
      res.status(200).json({
        status: 200,
        message: `User with ID ${id} deleted successfully`,
        user: deletedUserData,
      });
    } else {
      res.status(400).json({ message: `User with ID ${id} not found` });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    let updatedUser = await UserModel.findByIdAndUpdate(id, body);
    if (updatedUser) {
      res.status(200).json({
        status: 200,
        message: `User with ID ${id} updated successfully`,
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    let updatedUser = await UserModel.findByIdAndUpdate(id, body);
    if (updatedUser) {
      res.status(200).json({
        status: 200,
        message: `User with ID ${id} updated successfully`,
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found` });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
