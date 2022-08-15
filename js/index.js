const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 780;

const image = new Image();

image.src = "img/truck-level-one.png";
let gravity = 1;

function rect(positionX, positionY, width, height) {
  ctx.fillStyle = "red";
  ctx.fillRect(positionX, positionY, width, height);
}
function collisionRect(x, positionY, width, height, color) {
  ctx.globalAlpha = 1;
  this.x = x;
  this.width = width;
  this.color = color;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, positionY, width, height);
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
      (this.positionPointIndex = 0),
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
    for (let i = 0; i < mapPoints.length - 1; i++) {
      let collision = false;

      let x1 = mapPoints[i].x;
      let y1 = mapPoints[i].y;

      let x2 = mapPoints[i + 1].x;
      let y2 = mapPoints[i + 1].y;

      // console.log(mapPoints);

      // if (this.position.x >= 500) {
      //   mapPoints[i].x -= 5;
      //   mapMove.x -= 0.235;
      // }

      if (keys.right.pressed && this.position.x >= 500) {
        mapMove.x -= 0.1;
      } else if (keys.left.pressed && this.position.x <= 200) {
        mapMove.x += 0.1;
      }
      let angle = (y2 - y1) / (x2 - x1);
      console.log();
      //console.log(x2 - x1);
      // Slope collision detection-------------------
      let offsetX = -x1 - mapMove.x;
      let y = 0; //slope
      let m = angle; // rise/run
      let x = this.position.x + offsetX;
      let b = y1; // slope intercept

      let collisionZone3 = new collisionRect(
        -offsetX,
        0,
        x2 - x1,
        1000,
        "green"
      );

      y = m * x + b;
      if (
        this.position.x + this.width / 2 >= collisionZone3.x &&
        this.position.x + this.width / 2 <=
          collisionZone3.width + collisionZone3.x
      ) {
        collision = true;

        collisionZone3 = new collisionRect(
          -offsetX,
          0,
          x2 - x1,
          1000,
          "purple"
        );
      }
      if (this.position.y + this.height > y && collision == true) {
        this.velocity.y = 0;
        gravity = 1;
        this.position.y = y - this.height;
      }

      // This shows the slope angle-----------
      for (let i = 0; i < x2 - x1; i += 15) {
        y = m * i;
        new rect(i - offsetX, y + b, 10, 10);
      }
    }

    if (keys.right.pressed && this.position.x < 500) {
      this.velocity.x += 0.1;
    } else if (keys.right.pressed && this.position.x >= 500) {
      this.velocity.x = 0;
    } else if (!keys.left.pressed && !keys.right.pressed) {
      this.velocity.x = 0;
    }

    if (keys.left.pressed && this.position.x > 200) {
      this.velocity.x -= 0.1;
    } else if (keys.left.pressed && this.position.x <= 200) {
      this.velocity.x = 0;
    }
    //------------------------------------------------------

    if (keys.up.pressed) {
      this.velocity.y -= 2;
      gravity = -1;
    } else {
      gravity = 1;
    }
  }
}

const player = new Player({ position: { x: 300, y: 0 } });
let mapMove = {
  x: 0,
  y: 0,
};
function animate() {
  requestAnimationFrame(animate);

  player.update();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  ctx.drawImage(image, mapMove.x, 0);
  //angleTest();
  //mapLines();
  // console.log(player.position.y);
}

animate();

// function mapLines() {
//   for (let i = 0; i < mapPoints.length; i++) {
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = "red";
//     ctx.beginPath();
//     ctx.moveTo(mapPoints[i].x, mapPoints[i].y);

//     ctx.lineTo(mapPoints[i + 1].x, mapPoints[i + 1].y);
//     ctx.stroke();
//   }
// }

addEventListener("keydown", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;

      break;

    case 83:
      //console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;

      break;

    case 87:
      //console.log("up");
      keys.up.pressed = true;

      break;
  }
  //console.log(keys.up.pressed);e
});

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      //console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      // console.log("down");
      break;

    case 68:
      //console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      //console.log("up");
      keys.up.pressed = false;
      jump = false;

      break;
  }
});
