class Pendulum {
  constructor(origin, r, lineLength) {
    this.origin = origin;
    this.location = createVector();
    this.r = r;
    this.lineLength = lineLength;
    this.angle = Math.PI / 4;
    this.aVelocity = 0.0;
    this.Acceleration = 0.0;
    this.damping = 0.995;
  }

  go() {
    this.update();
    this.display();
  }

  update() {
    const gravity = 0.4;
    this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
    this.aVelocity *= this.damping;
  }

  display() {
    const l = this.r + this.lineLength;
    this.location.set(l * sin(this.angle), l * cos(this.angle), 0);
    this.location.add(this.origin);

    stroke(0);
    line(this.origin.x, this.origin.y, this.location.x, this.location.y);
    fill(175);
    ellipse(this.location.x, this.location.y, this.r, this.r);
  }
}

let p1;
function setup() {
  createCanvas(400, 400);
  const origin = createVector(width / 2, 20);
  p1 = new Pendulum(origin, 25, 150);
}

function draw() {
  background(255);
  p1.go();
}
