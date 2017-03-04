class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.location = createVector(x, y);
    this.velocity= createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16);
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    } else if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    }
  }

  applyForce(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
}

let movers = [];
function setup() {
  createCanvas(500, 500);
  smooth();
  for (let i = 0; i < 100; i++) {
    movers.push(new Mover(0, 0, random(0.1, 5)));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < movers.length; i++) {
    const wind = createVector(0.001, 0);
    const m = movers[i].mass;
    const gravity = createVector(0, 0.1 * m);

    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);

    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}
