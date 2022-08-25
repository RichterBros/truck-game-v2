const image = new Image();

image.src = "img/truck-level-one.png";

let truckAngle = [];

for (let i = 0; i < mapPoints.length - 1; i++) {
  let x1 = mapPoints[i].x;
  let y1 = mapPoints[i].y;

  let x2 = mapPoints[i + 1].x;
  let y2 = mapPoints[i + 1].y;

  truckAngle.push((y2 - y1) / (x2 - x1));
}

//console.log(truckAngle);

function collisionRect(x, positionY, width, height, color) {
  ctx.globalAlpha = 1;
  this.x = x;
  this.width = width;
  this.color = color;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, positionY, width, height);
}

class LevelOne {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
  }

  draw() {}

  update() {
    for (let i = 0; i < mapPoints.length - 1; i++) {
      let collision = false;

      let x1 = mapPoints[i].x;
      let y1 = mapPoints[i].y;

      let x2 = mapPoints[i + 1].x;
      let y2 = mapPoints[i + 1].y;

      if (keys.right.pressed && player.position.x >= 500) {
        mapMove.x -= 0.2;
      } else if (keys.left.pressed && player.position.x <= 200) {
        mapMove.x += 0.2;
      }
      let angle = (y2 - y1) / (x2 - x1);

      //console.log(player.position.y);
      //player.degrees = player.position.y;
      // Slope collision detection-------------------
      let offsetX = -x1 - mapMove.x;
      let y = 0; //slope
      let m = angle; // rise/run
      let x = player.position.x + offsetX;
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
        player.position.x + player.width / 2 >= collisionZone3.x &&
        player.position.x + player.width / 2 <=
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
      if (player.position.y + player.height > y && collision == true) {
        player.velocity.y = 0;
        jumpLimit = 0;

        player.position.y = y - player.height;
        player.currentSprite = player.sprites.idle;
        player.currentCropHeight = 56;
      }

      if (collision) {
        //player.degrees = m * 100;

        if (Math.round(player.degrees) < Math.round(m * 100)) {
          Math.round((player.degrees += 5));
        } else if (Math.round(player.degrees) > Math.round(m * 100)) {
          Math.round((player.degrees -= 5));
        }
        console.log(Math.round(m * 100));
        console.log(Math.round(player.degrees));
      }
      // if (collision == true && player.degrees != angle) {
      //   player.degrees += 1;d
      // } else if (collision == true && player.degrees === angle) {
      //   player.degrees = 0;
      // }
      //console.log(player.degrees);
      // This shows the slope angle-----------
      for (let i = 0; i < x2 - x1; i += 15) {
        y = m * i;
        new rect(i - offsetX, y + b, 10, 10);
      }
    }
    if (keys.right.pressed && player.position.x < 500) {
      player.velocity.x += 0.2;
    } else if (keys.right.pressed && player.position.x >= 500) {
      player.velocity.x = 0;
    } else if (!keys.left.pressed && !keys.right.pressed) {
      player.velocity.x = 0;
    }

    if (keys.left.pressed && player.position.x > 200) {
      player.velocity.x -= 0.2;
    } else if (keys.left.pressed && player.position.x <= 200) {
      player.velocity.x = 0;
    }
    //------------------------------------------------------

    if (keys.up.pressed && jumpLimit < 6) {
      player.velocity.y -= 3;
      gravity = -1;
      jumpLimit++;
      player.currentSprite = player.sprites.jump;
      player.currentCropHeight = 56;
    } else {
      gravity = 1;
    }
  }
}

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
