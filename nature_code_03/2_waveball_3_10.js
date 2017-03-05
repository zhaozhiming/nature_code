let startAngle = 0;
let angleVel = 0.2;
let angleVel2 = 0.1;

function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(255);

  let angle = startAngle;
  for (let x = 0; x <= width / 3; x += 6) {
    const y = map(cos(angle), -1, 1, 0, height);
    stroke(0);
    fill(0, 50);
    ellipse(x, y, 24, 24);
    angle += angleVel;
  }

  let angle2 = startAngle;
  for (let x = width / 2; x <= width; x += 3) {
    const y = map(noise(angle2), -1, 1, 0, height);
    stroke(0);
    fill(0, 50);
    rect(x, y, 12, 12);
    angle2 += angleVel2;
  }
}
