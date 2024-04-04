const express = require('express');
const { registerUser, loginUser, authenticateToken } = require('.//auht');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await registerUser(username, password);
  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  if (result.success) {
    res.json({ token: result.token });
  } else {
    res.status(401).json({ message: result.message });
  }
});

router.get('/validated', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  const result = await authenticateToken(token);
  if (result.success) {
    res.json({ message: 'Route validated', user: result.user });
  } else {
    res.status(403).json({ message: result.message });
  }
});

module.exports = router;
