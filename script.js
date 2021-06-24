const body = document.querySelector("body");
const randomBtn = document.getElementById("pick-random");
const launchBtn = document.getElementById("launch");

let running = false;

// Generate random colors HEX
function generateRandomColor() {
  let color = "#";

  let hex = "0123456789abcdef";
  let char, idx;
  for (let i = 0; i < 6; i++) {
    idx = Math.floor(Math.random() * 16);
    char = hex[idx];
    color += char;
  }
  // console.log(color)
  return color;
}

class Color {
  constructor(value) {
    this.value = value;
    this.speed = 1;
  }
}

let r = new Color(255);
let g = new Color(255);
let b = new Color(255);

// generate not random color rgb
function updateRGB() {
  if (r.value == 0 || g.value == 0 || b.value == 0) {
    running = false;
    return;
  }

  r.value -= r.speed;
  g.value -= g.speed;
  b.value -= b.speed;
}

function getSize() {
  return Math.floor(Math.random() * 201) + 100;
}

function getPosition() {
  return {
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight),
  };
}

function resetRGB() {
  // red
  r.speed = 1;
  r.value = 255;

  // green
  g.speed = 1;
  g.value = 255;

  // blue
  b.speed = 1;
  b.value = 255;
}

// generate random divs
function generateBalls() {
  let randomColor = generateRandomColor();
  let randomSize = getSize();
  let randomPosition = getPosition();

  let newRandomBall = document.createElement("div");
  newRandomBall.classList.add("random-ball");
  newRandomBall.style.width = randomSize + "px";
  // newRandomBall.style.backgroundColor = randomColor;
  newRandomBall.style.backgroundColor = `rgb(${r.value}, ${g.value}, ${b.value})`;
  newRandomBall.style.height = randomSize + "px";
  newRandomBall.style.left = randomPosition.x + "px";
  newRandomBall.style.top = randomPosition.y + "px";

  // Update rgb
  updateRGB();

  body.appendChild(newRandomBall);
}

randomBtn.addEventListener("click", () => {
  generateBalls();
});

launchBtn.addEventListener("click", () => {
  if (running) {
    resetRGB();
    running = false;
  } else {
    r.speed = 1 * Math.floor(Math.random() * 5) + 1;
    g.speed = 1 * Math.floor(Math.random() * 5) + 1;
    b.speed = 1 * Math.floor(Math.random() * 5) + 1;
    running = true;
  }
});

function launchCascade() {
  if (running) {
    generateBalls();
  } else {
    return;
  }
}

window.addEventListener("load", () => {
  setInterval(launchCascade, 250);
});
