class Kochine {
  constructor(a, b) {
    this.start = createVector(a.x, a.y);
    this.end = createVector(b.x, b.y);
  }

  display() {
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochA() {
    return createVector(this.start.x, this.start.y);
  }

  kochE() {
    return createVector(this.end.x, this.end.y);
  }

  kochB() {
    const v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  }

  kochD() {
    const v = p5.Vector.sub(this.end, this.start);
    v.mult(2 / 3.0);
    v.add(this.start);
    return v;
  }

  kochC() {
    const a = createVector(this.start.x, this.start.y);
    const v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);
    v.rotate(-radians(60));
    a.add(v);
    return a;
  }
}

class Koch {
  constructor(a, b, lines) {
    this.start = createVector(a.x, a.y);
    this.end = createVector(b.x, b.y);
    this.lines = lines;
  }

  generate() {
    const next = [];
    for (const l of this.lines) {
      const a = l.kochA();
      const b = l.kochB();
      const c = l.kochC();
      const d = l.kochD();
      const e = l.kochE();

      next.push(new Kochine(a, b));
      next.push(new Kochine(b, c));
      next.push(new Kochine(c, d));
      next.push(new Kochine(d, e));
    }
    this.lines = next;
  }

  display() {
    for (const l of this.lines) {
      l.display();
    }
  }
}

let k;
function setup() {
  createCanvas(600, 300);
  background(255);
  const start = createVector(0, 200);
  const end = createVector(width, 200);
  k = new Koch(start, end, [new Kochine(start, end)]);
  for (let i = 0; i < 5; i++) {
    k.generate();
  }
}

function draw() {
  k.display();
}
