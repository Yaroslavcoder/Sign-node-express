const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let userIdCounter = 1;
const users = [];

function encodePassword(password) {
    return 'hashed_' + password;
}
// Авторизація

app.post('/sign-up', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required!' });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({ message: 'Password length should be minimum 8 symbols!' });
        return;
    }

    if (users.find(user => user.email === email)) {
        res.status(400).json({ message: 'User with this email already exists!' });
        return;
    }

     const newUser = {
        id: userIdCounter++,
        email,
        password: encodePassword(password), 
        balance: 0,
        coinsPerClick: 1,
        passiveIncomePerSecond: 1
    };

      users.push(newUser);

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

    return res.status(200).json({
        message: 'Авторизація успішна!',
        email: user.email,
        id: user.id,
        balance: user.balance,
        coinsPerClick: user.coinsPerClick,
        passiveIncomePerSecond: user.passiveIncomePerSecond
    });
}); 


// Баланс
app.post('/click', (req, res) => {
    const { id } = req.body;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.balance += user.coinsPerClick;
    res.json({ success: true, balance: user.balance });
});

app.post('/passive-income', (req, res) => {
    const { id } = req.body; 
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.balance += user.passiveIncomePerSecond;
    res.json({ success: true, balance: user.balance });
});


//Апгрейди


function getRandomBonus(max) {
  return Math.floor(Math.random() * max);
}
const upgrades = [
  {
    id: 'click-accelerator',
    name: 'Click Accelerator',
    price: 1000,
    type: 'multiplyClick',
    value: 10
  },
  {
    id: 'coin-multiplier',
    name: 'Coin Multiplier',
    price: 4000,
    type: 'multiplyClick',
    value: 10
  },
  {
    id: 'power-tap',
    name: 'Power Tap',
    price: 1000,
    type: 'multiplyClick',
    value: 2
  },
  {
    id: 'coin-stream',
    name: 'Coin Stream',
    price: 4000,
    type: 'multiplyPassive',
    value: 2
  },
  {
    id: 'golden-touch',
    name: 'Golden Touch',
    price: 4000,
    type: 'addClick',
    value: getRandomBonus(20)
  },
  {
    id: 'Mining Drone',
    name: 'Golden Touch',
    price: 10000,
    type: 'addPassive',
    value: getRandomBonus(10)
  },
];
 
app.post('/buy-upgrade', (req, res) => {
  try {
    const { upgradeId, email } = req.body;
    if (!upgradeId || !email) {
      return res.status(400).json({ error: 'Missing upgradeId or email' });
    }

    const user = users.find(u => u.email === email);
    console.log('Отримано запит на апгрейд:', upgradeId, email);
    if (!user) { 
      return res.status(404).json({ error: 'User not found' });
    }

    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) {
      return res.status(404).json({ error: 'Upgrade not found' });
    }

    if (user.balance < upgrade.price) {
      return res.status(400).json({ error: 'Not enough balance' });
    }

    user.balance -= upgrade.price;

    switch (upgrade.type) {
      case 'multiplyClick':
        user.coinsPerClick *= upgrade.value;
        break;
      case 'addClick':
        user.coinsPerClick += upgrade.value;
        break;
      case 'multiplyPassive':
        user.passiveIncomePerSecond *= upgrade.value;
        break;
      case 'addPassive':
        user.passiveIncomePerSecond += upgrade.value;
        break;
      default:
        return res.status(409).json({ error: 'Unsupported upgrade type' });
    }

    return res.status(200).json({
      message: 'Upgrade purchased successfully',
      balance: user.balance,
      coinsPerClick: user.coinsPerClick,
      passiveIncomePerSecond: user.passiveIncomePerSecond
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});








app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); 