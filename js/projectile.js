class Projectile {
  constructor(x, y, color, velocity, width, height) {
    this.x = x;
    this.y = y;

    this.color = color;
    this.velocity = velocity;
    (this.width = width), (this.height = height);
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

let projectiles = [];
let particles = [];

addEventListener("click", handleEvent);
addEventListener("mousedown", () => {
  addEventListener("mousemove", handleEvent);
});

addEventListener("mouseup", () => {
  removeEventListener("mousemove", handleEvent);
});

function handleEvent(event) {
  const angle2 = Math.atan2(
    event.clientY - player.position.y,
    event.clientX - player.position.x
  );
  const velocity = {
    x: Math.cos(angle2) * 5,
    y: Math.sin(angle2) * 5,
  };

  projectiles.push(
    new Projectile(
      player.position.x,
      player.position.y,

      "rgba(255, 0, 0, 1)",
      { x: velocity.x, y: velocity.y },
      10,
      10
    )
  );
}

class Particle {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;

    this.color = "GreenYellow";
    this.velocity = velocity;
    this.size = Math.random() * 10;
    this.alpha = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x * 5;
    this.y = this.y + this.velocity.y * 5;
    this.alpha -= 0.01;
  }
}
