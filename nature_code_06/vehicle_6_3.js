class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector();
    this.velocity = createVector();
    this.location = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 4;
    this.maxforce = 0.1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display() {
    const theta = this.velocity.heading() + Math.PI / 2;
    fill(175);
    stroke(0);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape();
    vertex(0, this.r * -2);
    vertex(this.r * -1, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
  }
}

let v;
let target;
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(width / 2, height / 2);
  target = createVector(width / 3, height / 3);
}

function draw() {
  background(255);

  v.update();
  v.seek(target);
  v.display();

  stroke(0);
  fill(0);
  ellipse(target.x, target.y, 8, 8);
}

function keyPressed(){
  if (keyCode === UP_ARROW) {
    v.maxspeed += 1;
  }
  if (keyCode === DOWN_ARROW) {
    v.maxspeed -= 1;
  }
  if (keyCode === LEFT_ARROW) {
    v.maxforce += 0.1;
  }
  if (keyCode === RIGHT_ARROW) {
    v.maxforce -= 0.1;
  }
}
