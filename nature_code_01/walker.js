function moveToMouse(x, y) {
  const pros = [0.25, 0.5, 0.75];
  pros[0] = x < mouseX ? 0.4 : 0.1;
  pros[2] = y < mouseY ? 0.9 : 0.6;
  return pros;
}

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
    const pros = moveToMouse(this.x, this.y);
    const r = random(1);
    if (r < pros[0]) {
      this.x = this.x + 1;
    } else if (r < pros[1]) {
      this.x = this.x - 1;
    } else if (r < pros[2]) {
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
