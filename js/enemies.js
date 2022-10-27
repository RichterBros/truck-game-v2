const alien = new Image();
alien.src = "img/LargeAlien.png";

class Enemy {
  constructor(x, y, enemySize, color, velocity) {
    this.x = x;
    this.y = y;

    this.color = color;
    this.velocity = velocity;
    this.enemySize = enemySize;
  }
  draw() {
    ctx.drawImage(alien, this.x, this.y, this.enemySize, this.enemySize);
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

let enemies = [];
function spawnEnemies() {
  setInterval(() => {
    const size = Math.round(Math.random() * (60 - 20) + 20);

    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - size : canvas.width + size;
      y = Math.random() < 0.5 ? 0 - size : canvas.height + size;
    } else {
      x = Math.random() * canvas.width;

      y = Math.random() < 0.5 ? 0 - size : canvas.height + size;
    }
    const color = "green";

    const angle = Math.atan2(player.position.y - y, player.position.x - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    velocity.x;
    velocity.y;

    enemies.push(new Enemy(x, y, size, color, velocity));
  }, 300);
}
