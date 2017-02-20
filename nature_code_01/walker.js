class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  display() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    const r = random(1);
    if (r < 0.3) {
      this.x = this.x + 1;
    } else if (r < 0.5) {
      this.x = this.x - 1;
    } else if (r < 0.8) {
      this.y = this.y + 1;
    } else {
      this.y = this.y - 1;
    }
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
