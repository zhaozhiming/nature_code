class Ship {
  constructor() {
    this.postion = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.damping = 0.995;
    this.topseed = 6;
    this.heading = 0;
    this.r = 16;
    this.firing = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topseed);
    this.postion.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // const f = force.get();
    this.acceleration.add(force);
  }

  turn(a) {
    this.heading += a;
  }

  bigPush() {
    const angle = this.heading - Math.PI / 2;
    const force = createVector(cos(angle), sin(angle));
    force.mult(0.1);
    this.applyForce(force);
    this.firing = true;
  }

  wrapEdges() {
    const buffer = this.r * 2;
    if (this.postion.x > width + buffer) this.postion.x = -buffer;
    else if (this.postion.x < -buffer) this.postion.x = width + buffer;
    if (this.postion.y > height + buffer) this.postion.y = -buffer;
    else if (this.postion.y < -buffer) this.postion.y = height + buffer;
  }

  display() {
    stroke(0);
    strokeWeight(2);

    push();
    translate(this.postion.x, this.postion.y + this.r);
    rotate(this.heading);

    fill(175);
    if (this.firing) fill(255, 0, 0);
    rect(-this.r*4/5, this.r, this.r/3, this.r/2);
    rect(this.r/2, this.r, this.r/3, this.r/2);

    fill(175);
    beginShape();
    vertex(-this.r, this.r);
    vertex(0, -this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);
    rectMode(CENTER);
    pop();

    this.firing = false;
  }
}

let ship;
function setup() {
  createCanvas(500, 500);
  ship = new Ship();
}

function draw() {
  background(255);
  ship.update();
  ship.wrapEdges();
  ship.display();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ship.turn(-0.03);
  } else if (keyCode === RIGHT_ARROW) {
    ship.turn(0.03);
  } else if (key === 'z' || key === 'Z') {
    ship.bigPush();
  }
 }
