function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  const period = 120;
  // const amplitude = 100;
  // const y = amplitude * sin(Math.PI * 2 * frameCount / period);
  const y = map(sin(Math.PI * 2 * frameCount / period), -1, 1, -200, 200);

  stroke(0);
  fill(175);
  translate(width / 2, height / 2);
  line(0, 0, 0, y);
  ellipse(0, y, 20, 20);
}

