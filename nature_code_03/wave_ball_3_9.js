let startAngle = 0;
let angleVel = 0.1;

function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(255);

  let angle = startAngle;
  for (let x = 0; x <= width; x += 24) {
    // const y = map(sin(angle), -1, 1, 0, height);
    const y = map(noise(angle), -1, 1, 0, height);
    stroke(0);
    fill(0, 50);
    ellipse(x, y, 48, 48);
    angle += angleVel;
  }
}
