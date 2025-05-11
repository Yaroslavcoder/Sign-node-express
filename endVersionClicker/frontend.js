 // авторизація
const currentUser = JSON.parse(localStorage.getItem('currentUser'));



// баланс
const balanceElement = document.querySelector('.stat-value h3');
const balanceCoins = document.querySelector('.coins span');

const clickButton = document.querySelector('.click-button');
const nameElem = document.querySelector('.name');

if (nameElem && currentUser.email) {
    nameElem.textContent = currentUser.email;
};
function updateBalanceUI(newBalance) {
    balanceElement.textContent = newBalance;
    balanceCoins.textContent = newBalance;
};
function updateStatsUI(coinsPerClick, passiveIncome) {
    const clickEl = document.getElementById('coinsPerClick');
    const passiveEl = document.getElementById('passiveIncome');

    if (clickEl) clickEl.innerText = coinsPerClick;
    if (passiveEl) passiveEl.innerText = passiveIncome;
}

// нарахування монет
clickButton.addEventListener('click', () => {
    fetch('http://localhost:3000/click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: currentUser.id })
    })
    .then(response => response.json())
    .then(data => {
        updateBalanceUI(data.balance);
    })
    .catch(error => console.error('Click error:', error));
});

setInterval(() => {
    fetch('http://localhost:3000/passive-income', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: currentUser.id })
    })
    .then(response => response.json())
    .then(data => {
        updateBalanceUI(data.balance);
    })
    .catch(error => console.error('Passive income error:', error));
}, 1000);


//апгрейди
async function buyUpgrade(upgradeId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const email = currentUser?.email;
  if (!currentUser || !currentUser.email) {
    alert('User not logged in!');
    return;
  }
  try {
    const res = await fetch('http://localhost:3000/buy-upgrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ upgradeId, email })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Помилка: ${data.error}`);
      return;
    }

    updateBalanceUI()
    updateStatsUI(data.coinsPerClick, data.passiveIncomePerSecond);
    alert('Успішна покупка апгрейду!');
  } catch (error) {
    console.error('Помилка покупки апгрейду:', error);
    alert('Сталася помилка при покупці.');
  }
}