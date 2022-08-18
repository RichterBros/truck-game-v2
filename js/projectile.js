class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

let timer = null;
const projectiles = [];
addEventListener("mousedown", (event) => {
  timer = setInterval(function () {
    // the function can do whatever you need it to
    //console.log(event);

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
        5,
        "rgba(255, 0, 0, 1)",
        velocity
      )
    );
  }, 50);
});
addEventListener("mouseup", (event) => {
  clearInterval(timer);
});
