class Bob {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.dragOffset = createVector();
    this.damping = 0.95;
    this.mass = 12;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(this.damping);
  }

  applyForce(force) {
    force.div(this.mass);
    this.acceleration.add(force);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(175);
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
  }
}

class Spring {
  constructor(x, y, l) {
    this.anchor = createVector(x, y);
    this.len = l;
    this.k = 0.1;
  }

  connect(bob) {
    const force = p5.Vector.sub(bob.position, this.anchor);
    const d = force.mag();
    const stretch = d - this.len;
    force.normalize();
    force.mult(-1 * this.k * stretch);

    bob.applyForce(force);
  }

  display() {
    fill(100);
    rectMode(CENTER);
    rect(this.anchor.x, this.anchor.y, 10, 10);
  }

  displayLine(bob) {
    stroke(0);
    line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
  }

  constrainLength(bob, min, max) {
    const dir = p5.Vector.sub(bob.position, this.anchor);
    const d = dir.mag();

    if (d < min) {
      dir.normalize();
      dir.mult(min);
      bob.position = p5.Vector.add(this.anchor, dir);
      bob.velocity.mult(0);
    } else if (d > max) {
      dir.normalize();
      dir.mult(max);
      bob.position = p5.Vector.add(this.anchor, dir);
      bob.velocity.mult(0);
    }
  }
}

let b;
let spring;
function setup() {
  createCanvas(400, 400);
  b = new Bob(width / 2, height / 2);
  spring = new Spring(width / 2, 10, 100);
}

function draw() {
  background(255);

  const gravity = createVector(0, 1);
  b.applyForce(gravity);

  spring.connect(b);
  b.update();
  b.display();
  spring.display();
  spring.displayLine(b);
  spring.constrainLength(b, 100, 150);
}
