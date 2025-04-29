const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const user = {
  balance: 0,
  coinsPerClick: 1,
  passiveIncomePerSecond: 1
};

app.post('/click', (req, res) => {
  try {
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (typeof user.coinsPerClick !== 'number' || user.coinsPerClick < 0) {
      return res.status(409).json({ error: 'Invalid coinsPerClick value' });
    }

    user.balance += user.coinsPerClick;
    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/passive-income', (req, res) => {
  try {
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (typeof user.passiveIncomePerSecond !== 'number' || user.passiveIncomePerSecond < 0) {
      return res.status(409).json({ error: 'Invalid passiveIncomePerSecond value' });
    }

    user.balance += user.passiveIncomePerSecond;
    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});