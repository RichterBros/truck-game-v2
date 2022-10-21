let winBoxCollide = null;
let winState = false;
class WinBox {
  constructor({ position = { x: 0, y: 0 } }, width, height) {
    (this.position = position),
      (this.width = width),
      (this.height = height),
      (this.alpha = 1);
  }
  draw() {
    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "pink";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.restore();
  }
  update() {
    this.draw();

    // this.position.y = mapMove.y + 455;
    // this.position.x = mapMove.x + 6050;
    this.position.y = mapMove.y + 440;
    this.position.x = mapMove.x + 100;
    if (winState) {
      if (
        this.position.x + this.width >= player.position.x &&
        this.position.x <= player.position.x + player.width + 90 &&
        this.position.y + this.height >= player.position.y &&
        this.position.y <= player.position.y + player.height
      ) {
        console.log("You win!");
        this.alpha = 1;
        winState = false;
        cargoCollide = false;
        player.alpha = 0;
        cancelAnimationFrame(animationId);
        modalEl.style.display = "block";
        bigScoreEl.innerHTML = score + " " + "points" + " " + "YOU WIN!!!";
        points.innerHTML = "Good job!";
      }
      // if (winBoxCollide) {d
      //   this.position.x = player.position.x - 15;
      //   this.position.y = player.position.y - 20;
      // }
    }
    console.log(winState);
  }
}

let winBox = new WinBox({ position: { x: 700, y: 350 } }, 25, 25);
