function runGame() {
  const container = document.querySelector('.container');
  container.innerHTML = `<p>Score: 0</p>
<p class="chances">Chances: 3</p>
<div class="card">
  <div class="top">
    <h2>12</h2>
    <div class="image-container">
      <img class="img" src="img/heart.png" alt="heart image">
    </div>
  </div>
  <div class="middle">
    <div class="image-container">
      <img class="img" src="img/heart.png" alt="heart image">
    </div>
  </div>
  <div class="bottom">
    <h2>12</h2>
    <div class="image-container">
      <img class="img" src="img/heart.png" alt="heart image">
    </div>
  </div>
</div>
<p class="card-counter">Cards left: 52</p>
<div class="btn-container">
  <button>lower</button>
  <button>equal</button>
  <button>higher</button>
</div>`;

  let numbers = document.querySelectorAll('h2');
  let images = document.querySelectorAll('img');
  const buttons = document.querySelectorAll('.btn-container > button');
  const scoreCount = document.querySelector('p');
  const cardCounter = document.querySelector('.card-counter');
  const failCount = document.querySelector('.chances');

  const value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Kn', 'Q', 'K', 'A'];
  const colors = ['clubs', 'spade', 'diamond', 'heart'];

  let score = 0;
  let chances = 3;
  let cardCount = 52;

  const previousCards = [];

  generateCardValues();

  buttons[0].addEventListener('click', () => {
    isLower();
    scoreCount.innerText = `Score: ${score}`;
  });

  buttons[1].addEventListener('click', () => {
    isEqual();
    scoreCount.innerText = `Score: ${score}`;
  });

  buttons[2].addEventListener('click', () => {
    isHigher();
    scoreCount.innerText = `Score: ${score}`;
  });

  function isEqual() {
    generateCardValues();
    if (
      previousCards[previousCards.length - 2].value ===
      previousCards[previousCards.length - 1].value
    ) {
      score++;
    } else {
      chances--;
      failCount.innerText = `Chances: ${chances}`;
    }
    endGame();
  }
  function isLower() {
    generateCardValues();
    if (
      previousCards[previousCards.length - 2].value >
      previousCards[previousCards.length - 1].value
    ) {
      score++;
    } else {
      chances--;
      failCount.innerText = `Chances: ${chances}`;
    }
    endGame();
  }
  function isHigher() {
    generateCardValues();
    if (
      previousCards[previousCards.length - 2].value <
      previousCards[previousCards.length - 1].value
    ) {
      score++;
    } else {
      chances--;
      failCount.innerText = `Chances: ${chances}`;
    }
    endGame();
  }

  function compareCard(randomValue, randomColor) {
    for (let current of previousCards) {
      if (current.value === randomValue && current.color === randomColor) {
        return true;
      }
    }
    return false;
  }

  function generateCardValues() {
    let newCard = true;
    let randomValue;
    let randomColor;
    while (newCard) {
      randomValue = Math.floor(Math.random() * Math.floor(13));
      randomColor = Math.floor(Math.random() * Math.floor(4));
      newCard = compareCard(randomValue, randomColor);
    }

    cardCount--;
    cardCounter.innerHTML = `Cards left: ${cardCount}`;

    renderCard(randomValue, randomColor);
    previousCards.push({ value: randomValue, color: randomColor });
  }

  function renderCard(randomValue, randomColor) {
    numbers.forEach(number => {
      if (randomColor < 2) {
        number.style.color = 'black';
      } else {
        number.style.color = 'red';
      }
      number.innerText = value[randomValue];
    });
    images.forEach(image => {
      image.src = `/img/${colors[randomColor]}.png`;
    });
  }

  function endGame() {
    if (chances === 0) {
      againButton();
    } else if (cardCount === 0) {
      againButton();
    }
  }

  function againButton() {
    container.innerHTML = `
    <div class="card">
    <div class="top">
      <h2>12</h2>
      <div class="image-container">
        <img class="img" src="img/heart.png" alt="heart image">
      </div>
    </div>
    <div class="middle">
      <div class="image-container">
        <img class="img" src="img/heart.png" alt="heart image">
      </div>
    </div>
    <div class="bottom">
      <h2>12</h2>
      <div class="image-container">
        <img class="img" src="img/heart.png" alt="heart image">
      </div>
    </div>
  </div>
    <button class="again">Try again?</button>`;
    numbers = document.querySelectorAll('h2');
    images = document.querySelectorAll('img');
    renderCard(
      previousCards[previousCards.length - 1].value,
      previousCards[previousCards.length - 1].color
    );
    const tryAgain = document.querySelector('.again');
    tryAgain.addEventListener('click', () => {
      runGame();
    });
  }
}

window.onload = () => {
  runGame();
};
