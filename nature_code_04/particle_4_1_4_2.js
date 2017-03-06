class Particle {
  constructor(location) {
    this.acceleration = createVector(0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.location = location;
    this.lifespan = 255.0;
    this.angle = 0.0;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.angle += 0.1;
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  display() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    rect(0, 0, 8, 8);
    rectMode(CENTER);
  }

  isDead() {
    return this.lifespan < 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
}

let p;

function setup() {
  createCanvas(400, 400);
  p = new Particle(createVector(width / 2, height / 2));
}

function draw() {
  background(255);
  p.applyForce(createVector(0, 0.01));
  p.run();
}
