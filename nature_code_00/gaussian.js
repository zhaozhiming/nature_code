function setup() {
  createCanvas(640, 360);
}

function draw() {
  const numx = gaussion();
  const numy = gaussion();
  const sd = 60;
  const mean = 320;
  const x = sd * numx + 320;
  const y = sd * numy + 180;
  noStroke();
  fill(random(255), random(255), random(255), 20);
  ellipse(x, y, 16, 16);
}
