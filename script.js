const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // grid size
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box,
};

let score = 0;
let direction = "RIGHT";

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#fff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move Snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;

  // Snake eats food
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").textContent = score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
  } else {
    snake.pop(); // remove tail
  }

  // Game Over: Wall collision or self collision
  if (
    headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height ||
    snake.some(segment => segment.x === headX && segment.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
  }

  // Add new head
  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

let game = setInterval(draw, 150);
