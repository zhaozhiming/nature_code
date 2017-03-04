let r = 1;
let theta = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  smooth();
}

function draw() {
  const x = r * cos(theta);
  const y = r * sin(theta);

  noStroke();
  fill(0);
  ellipse(x + width / 2, y + height / 2, 2, 2);

  theta += 0.01;
  r += 0.01;
}
