const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = 786;

const scoreEl = document.querySelector("#scoreEl");
const startBameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");
console.log(scoreEl);

function init() {
  player = new Player({ position: { x: 500, y: 0 } });
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  bigScoreEl.innerHTML = score;
}
let flag = true;
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
const truckImage = new Image();
truckImage.src = "img/truckSpritesheetIdle_V3.png";
const truckImageJump = new Image();
truckImageJump.src = "img/truck-jumpV2.png";

class Player {
  constructor({ position = { x: 0, y: 0 } }) {
    (this.position = position),
      (this.width = 10),
      (this.height = 30),
      (this.degrees = 0),
      (this.velocity = {
        y: 0,
        x: 0,
      }),
      (this.frames = 0),
      (this.sprites = {
        idle: truckImage,
        jump: truckImageJump,
        cropWidth: 119,
        cropHeight: 87,
      }),
      (this.radius = 50),
      (this.collisionSquare = {
        x: -15,
        y: -15,
      }),
      (this.collisionSquare.width = 25),
      (this.collisionSquare.height = 25),
      (this.alpha = 1);

    this.currentSprite = this.sprites.idle;
    this.currentCropWidth = this.sprites.cropWidth;
    this.currentCropHeight = this.sprites.cropHeight;
  }
  draw() {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate((this.degrees * Math.PI) / 360);

    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "brown";
    ctx.fillRect(
      this.collisionSquare.x,
      this.collisionSquare.y,
      this.collisionSquare.width,
      this.collisionSquare.height
    );
    ctx.restore();

    ctx.fillStyle = "brown";

    ctx.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,

      0,
      this.currentCropWidth,
      this.currentCropHeight,
      -25,
      -50,
      119,
      this.currentCropHeight
    );

    ctx.restore();
  }
  update() {
    this.frames++;

    if (this.frames >= 8 && this.currentSprite == this.sprites.idle) {
      this.frames = 0;
    } else if (this.frames >= 59 && this.currentSprite == this.sprites.jump) {
      this.frames = 0;
    }
    this.draw();

    this.velocity.y += gravity;
    this.position.y += this.velocity.y;

    this.position.x += this.velocity.x;
    // this.collisionSquare.y -= 1;
    // // this.collisionSquare.y += 1;
    // if (this.collisionSquare.y <= -20) {
    //   this.collisionSquare.y += 1;
    // }

    if (flag) {
      //do something, and eventually set flag to false
      this.collisionSquare.y -= 1;
      if (this.collisionSquare.y == -17) {
        flag = false;
      }
    } else if (!flag) {
      this.collisionSquare.y += 1;
    }
    if (this.collisionSquare.y == -10) {
      this.collisionSquare.y -= 1;
      flag = true;
    }

    //console.log(this.collisionSquare.y);
    // if (keys.up.pressed && jumpLimit < 6) {
    //   player.currentCropHeight = 87;
    //   player.currentSprite = player.sprites.jump;
    //   player.velocity.y -= 3;
    //   gravity = -1;
    //   jumpLimit++;
    // } else {
    //   gravity = 1;
    // }
  }
}
const levelOne = new LevelOne({ position: { x: 0, y: 0 } });

let player = new Player({ position: { x: 500, y: 0 } });

//const projectile = new Projectile(200, 200, 15, "red", null);
//const gunRotate = new GunRotate(200, 200, 200, 50);
let animationId;
let score = 0;
function animate() {
  animationId = requestAnimationFrame(animate);

  levelOne.update();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    backgroundImage,
    backgroundMove.x - 250,
    backgroundMove.y - 500
  );
  player.update();
  cargo.update();
  ctx.drawImage(image, mapMove.x, mapMove.y);

  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });

  // gunRotate.draw();

  if (keys.up.pressed && jumpLimit < 6) {
    player.currentSprite = player.sprites.jump;
    player.velocity.y -= 3;
    gravity = -1;
    jumpLimit++;
  } else {
    gravity = 1;
  }

  // player.currentCropHeight = 56;

  projectiles.forEach((projectile, index) => {
    projectile.update();

    //remove from screen
    if (
      projectile.x < 0 ||
      projectile.x > canvas.width ||
      projectile.y < 0 ||
      projectile.y > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });
  //console.log(player.collisionSquare.x);

  enemies.forEach((enemy, index) => {
    enemy.update();
    if (keys.right.pressed && player.position.x >= 500) {
      enemy.x -= 8;
    } else if (keys.left.pressed && player.position.x <= leftMove) {
      enemy.x += 8;
    }
    const dist = Math.hypot(
      player.position.x - enemy.x,
      player.position.y - enemy.y
    );

    // end game
    // if (
    //   enemy.x + enemy.enemySize >= player.position.x &&
    //   enemy.x <= player.position.x + player.width + 90 &&
    //   enemy.y + enemy.enemySize >= player.position.y &&
    //   enemy.y <= player.position.y + player.height
    // ) {
    //   cancelAnimationFrame(animationId);
    //   modalEl.style.display = "block";
    //   bigScoreEl.innerHTML = score;
    // }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // when projectiles touch enemy
      // if (dist - enemy.radius - projectile.radius < 1) {
      //   setTimeout(() => {
      //     enemies.splice(index, 1);
      //     projectiles.splice(projectileIndex, 1);
      //   }, 0);
      // }
      if (
        enemy.x + enemy.enemySize >= projectile.x &&
        enemy.x <= projectile.x + projectile.width &&
        enemy.y + enemy.enemySize >= projectile.y &&
        enemy.y <= projectile.y + projectile.height
      ) {
        //increase score
        score += 100;
        scoreEl.innerHTML = score;

        //create explosions
        for (let i = 0; i < 8; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,

              {
                x: Math.random() - 0.5,
                y: Math.random() - 0.5,
              }
            )
          );
        }

        setTimeout(() => {
          enemies.splice(index, 1);
          projectiles.splice(projectileIndex, 1);
        }, 0);
      }
    });
  });

  //enemy.update();

  //mapLines();
}
addEventListener("click", (event) => {
  console.log(event.clientX);
  console.log(event.clientY);
});

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
      //console.log("left");
      keys.left.pressed = true;

      break;

    case 83:
      break;

    case 68:
      //console.log("right");
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

      break;
  }
});

startGameBtn.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  modalEl.style.display = "none";
});
