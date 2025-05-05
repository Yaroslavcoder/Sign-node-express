const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let upgradeList = [
  { id: 1, name: "Click Accelerator", description: "speed of earning x10", price: 4000 },
  { id: 2, name: "Coin Multiplier", description: "ClickCoins per click x10", price: 4000 },
  { id: 3, name: "Power Tap", description: "ClickCoins per click x2", price: 1000 },
];

app.get('', (req, res) => {
  res.json(upgradeList);
});

app.get('/:id', (req, res) => {
  const upgradeId = Number(req.params.id);
  const foundUpgrade = upgradeList.find(u => u.id === upgradeId);

  if (foundUpgrade) {
    res.status(200).json(foundUpgrade);
  } else {
    res.status(404).json({ message: 'Not Found ( Апгрейд не знайдено ' });
  }
});

app.post('', (req, res) => {
  const { id, name, description, price } = req.body;
  const exists = upgradeList.some(item => item.id === id);

  if (exists) {
    return res.status(409).json({ message: 'Upgrade with this ID already exists ID вже існує' });
  }

  const newItem = { id, name, description, price };
  upgradeList.push(newItem);
  res.status(201).json(newItem);
});

app.put('/:id', (req, res) => {
  const targetId = Number(req.params.id);
  const { name, description, price } = req.body;

  const itemIndex = upgradeList.findIndex(item => item.id === targetId);

  if (itemIndex < 0) {
    return res.status(404).json({ message: 'Not Found Апгрейд не знайдено' });
  }

  if (!name || !description || typeof price !== 'number') {
    return res.status(400).json({ message: 'Bad Request Некоректні дані' });
  }

  upgradeList[itemIndex] = { id: targetId, name, description, price };
  res.json(upgradeList[itemIndex]);
});

app.delete('/:id', (req, res) => {
  const delId = Number(req.params.id);
  const position = upgradeList.findIndex(upg => upg.id === delId);

  if (position === -1) {
    return res.status(404).json({ message: 'ID не знайдено' });
  }

  upgradeList.splice(position, 1);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000');
});
