class Mover {
  constructor() {
    this.location = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.01;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    // this.aAcceleration = this.acceleration.x / 10.0;
    this.aVelocity += this.aAcceleration;
    // this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
    // this.angle += this.aVelocity;
    this.angle = atan(this.velocity.y / this.velocity.x);

    this.acceleration.mult(0);
  }

  display() {

    stroke(0);
    fill(175, 200);
    rectMode(CENTER);
    push();

    translate(this.location.x, this.location.y);
    rotate(this.angle);
    rect(0, 0, this.mass * 16, this.mass * 16);
    pop();
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
}

let mover;
function setup() {
  createCanvas(400, 400);
  mover = new Mover();
}

function draw() {
  background(255);

  mover.update();
  mover.checkEdges();
  mover.display();
}
