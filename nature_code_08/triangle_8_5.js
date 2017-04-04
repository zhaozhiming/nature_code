class Triangle {
  constructor(a, b, c) {
    this.a = createVector(a.x, a.y);
    this.b = createVector(b.x, b.y);
    this.c = createVector(c.x, c.y);
  }

  display() {
    push();
    fill(0);
    beginShape();
    vertex(this.a.x, this.a.y);
    vertex(this.b.x, this.b.y);
    vertex(this.c.x, this.c.y);
    endShape(CLOSE);
    pop();
  }
}

class Ts {
  constructor(triangles) {
    this.triangles = triangles;
  }

  generate() {
    const next = [];
    for (const t of this.triangles) {
      const abmid = p5.Vector.lerp(t.b, t.a, 0.5);
      const bcmid = p5.Vector.lerp(t.c, t.b, 0.5);
      const camid = p5.Vector.lerp(t.a, t.c, 0.5);
      next.push(new Triangle(t.a, abmid, camid));
      next.push(new Triangle(abmid, t.b, bcmid));
      next.push(new Triangle(camid, bcmid, t.c));
    }
    this.triangles = next;
  }

  display() {
    for (const t of this.triangles) {
      t.display();
    }
  }
}


let ts;
function setup() {
  createCanvas(400, 400);
  ts = new Ts([new Triangle(createVector(width / 2, 0), createVector(0, height), createVector(height, width))]);
  for (let i = 0; i < 5; i++) {
    ts.generate();
  }
}

function draw() {
  background(255);
  ts.display();
}
