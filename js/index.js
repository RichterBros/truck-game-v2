const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 780;

let gravity = 1;
let jumpLimit = 0;
function rect(positionX, positionY, width, height) {
  ctx.fillStyle = "red";
  ctx.fillRect(positionX, positionY, width, height);
}

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
  exit: {
    pressed: false,
  },
};

class Player {
  constructor({ position = { x: 0, y: 0 } }) {
    (this.position = position),
      (this.width = 5),
      (this.height = 20),
      (this.velocity = {
        y: 0,
        x: 0,
      });
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;

    this.position.x += this.velocity.x;
    console.log(this.velocity.y);
  }
}
const levelOne = new LevelOne({ position: { x: 0, y: 0 } });
const player = new Player({ position: { x: 300, y: 0 } });

let mapMove = {
  x: 0,
  y: 0,
};

function animate() {
  requestAnimationFrame(animate);

  player.update();
  levelOne.update();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  ctx.drawImage(image, mapMove.x, 0);

  //mapLines();
}

animate();

function mapLines() {
  for (let i = 0; i < mapPoints.length; i++) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(mapPoints[i].x, mapPoints[i].y);

    ctx.lineTo(mapPoints[i + 1].x, mapPoints[i + 1].y);
    ctx.stroke();
  }
}

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;

      break;

    case 83:
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;

      break;

    case 87:
      keys.up.pressed = true;

      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;

    case 83:
      break;

    case 68:
      keys.right.pressed = false;
      break;

    case 87:
      keys.up.pressed = false;
      jump = false;

      break;
  }
});
