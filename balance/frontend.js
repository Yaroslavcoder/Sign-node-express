const balanceElement = document.querySelector('.stat-value h3');
const balanceCoins = document.querySelector('.coins span');
const clickButton = document.querySelector('.click-button');


function updateBalanceUI(newBalance) {
    balanceElement.textContent = newBalance;
    balanceCoins.textContent = newBalance;
  }

clickButton.addEventListener('click', () => {
  fetch('http://localhost:3000/click', { method: 'POST' })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
        updateBalanceUI(data.balance);
    })
    .catch(error => {
      console.error('Error during click:', error);
    });
});

setInterval(() => {
  fetch('http://localhost:3000/passive-income', { method: 'POST' })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
        updateBalanceUI(data.balance);
    })
    .catch(error => {
      console.error('Error during passive income:', error);
    });
}, 1000);
