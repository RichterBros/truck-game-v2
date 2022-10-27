class SpikeBox {
  constructor(positionX, positionY, width, height, offsetX, offsetY) {
    (this.positionX = positionX),
      (this.positionY = positionY),
      (this.width = width),
      (this.height = height),
      (this.alpha = 0),
      (this.offsetX = offsetX),
      (this.offsetY = offsetY);
  }
  draw() {
    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    ctx.restore();
  }
  update() {
    this.draw();

    this.positionX = mapMove.x + this.offsetX;
    this.positionY = mapMove.y + this.offsetY;

    if (
      this.positionX + this.width >= player.position.x &&
      this.positionX <= player.position.x + player.width + 90 &&
      this.positionY + this.height >= player.position.y &&
      this.positionY <= player.position.y + player.height
    ) {
      cancelAnimationFrame(animationId);
      modalEl.style.display = "block";
      bigScoreEl.innerHTML = score;
    }
  }
}

let spikeBox = new SpikeBox(0, 0, 170, 25, 1850, 555);
let spikeBox2 = new SpikeBox(0, 0, 500, 25, 2450, 570);
