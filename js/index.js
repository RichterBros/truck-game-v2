const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 786;

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
      });

    this.currentSprite = this.sprites.idle;
    this.currentCropWidth = this.sprites.cropWidth;
    this.currentCropHeight = this.sprites.cropHeight;
  }
  draw() {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate((this.degrees * Math.PI) / 360);

    // ctx.fillStyle = "red";
    // ctx.fillRect(0, 0, 119, 87);
    //ctx.drawImage(truckImage, 0, -25, 119, 56);
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

const player = new Player({ position: { x: 300, y: 0 } });

//const projectile = new Projectile(200, 200, 15, "red", null);
function animate() {
  requestAnimationFrame(animate);

  levelOne.update();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // player.draw();
  ctx.drawImage(
    backgroundImage,
    backgroundMove.x - 250,
    backgroundMove.y - 500
  );
  player.update();
  ctx.drawImage(image, mapMove.x, mapMove.y);

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
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, index) => {
    enemy.update();
    if (keys.right.pressed && player.position.x >= 500) {
      enemy.x -= 5;
    } else if (keys.left.pressed && player.position.x <= 200) {
      enemy.x += 5;
    }
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (
      dist - enemy.radius - Player.x + player.width &&
      dist - enemy.radius - Player.y + player.height < 1
    ) {
      console.log("hit");
    }
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // when projectiles touch enemy
      if (dist - enemy.radius - projectile.radius < 1) {
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

animate();
spawnEnemies();
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
