const express = require('express');
const cors = require('cors');
const encodePassword = require('./hash').encodePassword;
const app = express();

app.use(cors());
app.use(express.json());

const users = [];
app.get('/', (req, res) => {
  res.send('Ви майже на Stasik Hub ඞ');
}); 

app.post('/sign-up', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required!' });
      return
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'Password length should be minimum 8 symbols!' });
      return
    }

    if (users.find(user => user.email === email)) {
      res.status(400).json({ message: 'User with this email already exists!' });
      return
    }

    const hashedPassword = encodePassword(password);
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: 'Реєстрація успішна!' });
});

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
  }

  const user = users.find(user => user.email === email);
  if (!user || user.password !== encodePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Авторизація успішна!' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
app.get('/sign-up', (req, res) => {
  res.send('Цей маршрут підтримує лише POST-запити');
});