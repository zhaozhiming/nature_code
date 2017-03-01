class Mover {
  constructor() {
    this.location = createVector(random(width / 2), random(height / 2));
    this.velocity= createVector(random(-2, 2), random(-2, 2));
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(map(noise(0.01), 0, 1, -0.01, 0.01));
    this.topSpeed = 10;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, 16, 16);
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }
    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}

let mover;
let windPower = 0;
function setup() {
  createCanvas(500, 500);
  smooth();
  mover = new Mover();
}

function draw() {
  background(255);
  const wind = createVector(map(noise(windPower), 0, 1, -0.01, 0.01), 0);
  mover.applyForce(wind);
  windPower += 0.01;
  mover.update();
  mover.checkEdges();
  mover.display();
  console.log({ mag: mover.velocity.mag() });
}

function mousePressed() {
  const wind = createVector(0.5, 0);
  mover.applyForce(wind);
}
