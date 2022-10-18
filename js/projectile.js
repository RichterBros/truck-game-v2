class Projectile {
  constructor(x, y, color, velocity, width, height) {
    this.x = x;
    this.y = y;

    this.color = color;
    this.velocity = velocity;
    (this.width = width), (this.height = height);
  }
  draw() {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();

    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

let timer = null;
const projectiles = [];

// addEventListener("click", (event) => {
//   //console.log(projectiles);
//   //timer = setInterval(function () {
//   // the function can do whatever you need it to
//   //console.log(event);

//   const angle2 = Math.atan2(
//     event.clientY - player.position.y,
//     event.clientX - player.position.x
//   );
//   const velocity = {
//     x: Math.cos(angle2) * 5,
//     y: Math.sin(angle2) * 5,
//   };
//   console.log(event.clientX);
//   console.log(event.clientY);
//   //console.log(player.position.y);
//   //console.log(velocity);
//   projectiles.push(
//     new Projectile(
//       player.position.x,
//       player.position.y,

//       "rgba(255, 0, 0, 1)",
//       { x: velocity.x, y: velocity.y },
//       10,
//       10
//     )
//   );
//   //}, 75);
// });
// addEventListener("mouseup", (event) => {
//   clearInterval(timer);
//   // removeEventListener("mousemove", test());
// });
addEventListener("click", (event) => {
  console.log(projectiles);
  const angle = Math.atan2(
    event.clientY - player.position.y,
    event.clientX - player.position.x
  );
  const velocity = {
    x: Math.cos(angle) * 20,
    y: Math.sin(angle) * 20,
  };

  projectiles.push(
    (projectile = new Projectile(
      player.position.x,
      player.position.y,

      "red",
      velocity,
      10,
      10
    ))
  );
});
