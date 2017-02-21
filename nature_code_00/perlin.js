class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.tx = 0;
    this.ty = 5000;
  }

  display() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    const stepx = map(noise(this.tx), 0, 1, -1, 1);
    const stepy = map(noise(this.ty), 0, 1, -1, 1);
    this.x += stepx;
    this.y += stepy;
    this.tx += 0.01;
    this.ty += 0.01;
  }
}

let w;

function setup() {
  createCanvas(640, 360);
  w = new Walker();
  background(255);
}

function draw() {
  w.step();
  w.display();
}
