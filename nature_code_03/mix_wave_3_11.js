let startAngle = 0;
let angleVel = 0.2;

function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(255);

  let angle = startAngle;
  for (let x = 0; x <= width; x += 6) {
    let y;
    if (x < width / 3) {
      y = map(noise(angle), -1, 1, 0, height);
    } else if (x < width * 2 / 3) {
      y = map(sin(angle), -1, 1, 0, height);
    } else {
      y = map(cos(angle), -1, 1, 0, height);
    }
    stroke(0);
    fill(0, 50);
    ellipse(x, y, 24, 24);
    angle += angleVel;
  }
}

