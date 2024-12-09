const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let score = 0;
let isJumping = false;
let jumpHeight = 50;
let dinoX = 50;
let dinoY = canvas.height - 60;
let cacti = [];
let birdY = 70;
let birdX = canvas.width;
let interval;

function startGame() {
  score = 0;
  isJumping = false;
  dinoY = canvas.height - 60;
  cacti = [];
  birdX = canvas.width;
  birdY = 70;
  clearInterval(interval);
  interval = setInterval(update, 20);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDino();
  drawCacti();
  drawBird();
  moveCacti();
  moveBird();
  checkCollisions();
  updateScore();
}

function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dinoX, dinoY, 40, 40);  // Karakter dinosaurus yang lebih kecil
}

function drawCacti() {
  ctx.fillStyle = "green";
  cacti.forEach(cactus => {
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
  });
}

function drawBird() {
  ctx.fillStyle = "red";
  ctx.fillRect(birdX, birdY, 30, 20);  // Burung yang lebih kecil
}

function moveCacti() {
  cacti.forEach(cactus => {
    cactus.x -= 4;  // Kecepatan lebih lambat
  });
  cacti = cacti.filter(cactus => cactus.x > 0);
  if (Math.random() < 0.03) {
    cacti.push({ x: canvas.width, y: canvas.height - 50, width: 40, height: 15 });  // Ukuran lebih kecil
  }
}

function moveBird() {
  birdX -= 4;  // Burung bergerak lebih lambat
  if (Math.random() < 0.03) {
    birdY = Math.random() * (canvas.height - 70);  // Tinggi burung berubah-ubah
  }
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    let upInterval = setInterval(() => {
      if (jumpHeight > 0) {
        dinoY -= 4;  // Lompatan lebih rendah
        jumpHeight -= 4;
      } else {
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if (jumpHeight < 90) {
            dinoY += 4;  // Lompatan lebih cepat turun
            jumpHeight += 4;
          } else {
            clearInterval(downInterval);
            isJumping = false;
          }
        }, 20);
      }
    }, 20);
  }
}

function checkCollisions() {
  cacti.forEach(cactus => {
    if (dinoX < cactus.x + cactus.width &&
        dinoX + 40 > cactus.x &&
        dinoY < cactus.y + cactus.height &&
        dinoY + 40 > cactus.y) {
      gameOver();
    }
  });
  
  if (dinoX < birdX + 30 &&
      dinoX + 40 > birdX &&
      dinoY < birdY + 20 &&
      dinoY + 40 > birdY) {
    gameOver();
  }
}

function updateScore() {
  score++;
  document.getElementById("score").textContent = score;
}

function gameOver() {
  clearInterval(interval);
  alert(`Game Over! Skor akhir: ${score}`);
}

document.addEventListener("keydown", jump);
document.getElementById("restart-btn").addEventListener("click", startGame);

startGame();
