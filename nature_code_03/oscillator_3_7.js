class Oscillator {
  constructor() {
    this.angle = createVector();
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.acceleration = createVector(0.01, 0.01);
    this.amplitude = createVector(random(width / 2), random(height / 2));
  }

  oscillate() {
    this.velocity.add(this.acceleration);
    this.angle.add(this.velocity);
  }

  display() {
    const x = sin(this.angle.x) * this.amplitude.x;
    const y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width / 2, height / 2);
    stroke(0);
    fill(175);
    line(0, 0, x, y);
    ellipse(x, y, 16, 16);

    pop();
    this.acceleration.mult(0);
  }
}

let oscillator;
function setup() {
  createCanvas(400, 400);
  oscillator= new Oscillator();
}

function draw() {
  background(255);
  oscillator.oscillate();
  oscillator.display();
}
