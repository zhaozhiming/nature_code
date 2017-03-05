let angle = 0;
let angleVel = 0.2;

function setup() {
  createCanvas(400, 200);
  smooth();
}

function draw() {
  background(255);

  stroke(0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let x = 0; x <= width; x += 5) {
    const y = map(sin(angle), -1, 1, 0, height);
    vertex(x, y);
    angle += angleVel;
  }
  endShape();
}
