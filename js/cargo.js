let cargoCollide = false;
let getCargo = 0;
const box = new Image();

box.src = "img/crate2.jpg";

let getCrate = new Audio();
getCrate.src = "audio/Pickup_coin 52.wav";

class Cargo {
  constructor({ position = { x: 0, y: 0 } }, width, height) {
    (this.position = position),
      (this.width = width),
      (this.height = height),
      (this.alpha = 1);
  }
  draw() {
    ctx.save();

    ctx.globalAlpha = this.alpha;

    ctx.drawImage(
      box,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
  update() {
    this.draw();

    this.position.y = mapMove.y + 430;
    this.position.x = mapMove.x + 6050;

    if (
      this.position.x + this.width >= player.position.x &&
      this.position.x <= player.position.x + player.width + 90 &&
      this.position.y + this.height >= player.position.y &&
      this.position.y <= player.position.y + player.height
    ) {
      this.alpha = 0;
      cargoCollide = true;
      player.alpha = 1;
      getCargo += 1;
      if (getCargo < 2) {
        getCrate.play();
      }
    }

    if (cargoCollide) {
      winState = true;
    }
  }
}

let cargo = new Cargo({ position: { x: 500, y: 325 } }, 50, 50);
