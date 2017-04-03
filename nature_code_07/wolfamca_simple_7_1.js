class CA {
  constructor() {
    this.w = 10;
    this.cells = new Array(width / this.w);
    this.cells.fill(0);
    this.ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
    this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
    this.delay = 0;
  }

  generate() {
    const nextgen = new Array(this.cells.length);
    for (let i = 1; i < this.cells.length - 1; i++) {
      const left = this.cells[i - 1];
      const me = this.cells[i];
      const right = this.cells[i + 1];
      nextgen[i] = this.rules(left, me, right);
    }
    this.cells = nextgen;
    this.generation += 1;
  }

  rules (a, b, c) {
    if (a === 1 && b === 1 && c === 1) return this.ruleset[0];
    if (a === 1 && b === 1 && c === 0) return this.ruleset[1];
    if (a === 1 && b === 0 && c === 1) return this.ruleset[2];
    if (a === 1 && b === 0 && c === 0) return this.ruleset[3];
    if (a === 0 && b === 1 && c === 1) return this.ruleset[4];
    if (a === 0 && b === 1 && c === 0) return this.ruleset[5];
    if (a === 0 && b === 0 && c === 1) return this.ruleset[6];
    if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
    return 0;
  }

  display() {
    if (this.isFinished()) {
      if (this.delay > 60) {
        this.restart();
      } else {
        this.delay += 1;
      }
    } else {
      for (let i = 0; i < this.cells.length; i++) {
        fill(this.cells[i] === 1 ? 0: 255);
        rect(i * this.w, this.generation * this.w, this.w, this.w);
      }
    }
  }

  restart() {
    this.generation = 0;
    this.delay = 0;
    this.ruleset = [];
    for (let i = 0; i < 8; i++) {
      this.ruleset[i] = Math.floor(Math.random() * 2);
    }
    this.cells[this.cells.length / 2] = 1;
    background(255);
  }

  isFinished() {
    return this.generation > height / this.w;
  }
}

let ca;
function setup() {
  createCanvas(400, 400);
  ca = new CA();
}

function draw() {
  ca.display();
  ca.generate();
}
