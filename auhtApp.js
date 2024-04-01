const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const secretKey = 'mySecretKey';
const users = [];

app.use(express.json());

const registerUser = async (req, res) => {
    const { username, password } = req.body;
        //Google recaptcha is required
        //Google authentication credentials
    try {
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });

        return res.status(201).json({ message: 'Registration successful', hashedPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username }, secretKey);
        
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed' });
    }
};

const authenticateToken = (req, res, next) => {
};

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Route protected', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`);
});
