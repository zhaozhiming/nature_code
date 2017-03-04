let aVelocity = 0;
let angle = 0;
let aAcceleration = 0.01;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  fill(175);
  stroke(0);
  rectMode(CENTER);
  translate(width / 2, height / 2);
  rotate(angle);
  line(-50, 0, 50, 0);
  ellipse(50, 0, 8, 8);
  ellipse(-50, 0, 8, 8);

  aVelocity += aAcceleration;
  angle += aVelocity;
}
