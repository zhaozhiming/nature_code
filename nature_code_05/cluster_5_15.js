const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D;
const Vec2D = toxi.geom.Vec2D;


let physics;

class Node extends VerletParticle2D {
  constructor(loc) {
    super(loc);
  }

  display() {
    fill(0, 150);
    stroke(0);
    ellipse(this.x, this.y, 16, 16);
  }
}

class Connection extends VerletSpring2D {
  constructor(p1, p2, len, strength) {
    super(p1, p2, len, strength);
  }

  display() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class OutConnect extends VerletMinDistanceSpring2D {
  constructor(p1, p2, len, strength) {
    super(p1, p2, len, strength);
  }

  display() {
    stroke(0,50);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Cluster {
  constructor(n, d, center) {
    this.nodes = [];
    this.lines = [];
    this.outLines = [];
    this.d = d;
    for(let i = 0; i < n; i++) {
      this.nodes.push(new Node(center.add(Vec2D.randomVector())));
    }

    for(let i = 0; i < this.nodes.length - 1; i++) {
      const ni = this.nodes[i];
      for(let j = i + 1; j < this.nodes.length; j++) {
        const nj = this.nodes[j];
        const c = new Connection(ni, nj, this.d, 0.01);
        physics.addSpring(c);
        this.lines.push(c);
      }
    }
  }

  connect(other) {
    const otherNodes = other.nodes;
    for (let i = 0; i < this.nodes.length; i++) {
      const pi = this.nodes[i];
      for (let j = 0; j < otherNodes.length; j++) {
        const pj = otherNodes[j];
        const c = new OutConnect(pi, pj, (this.d + other.d) * 0.5, 0.05);
        physics.addSpring(c);
        this.outLines.push(c);
      }
    }
  }

  display() {
    for (const n of this.nodes) {
      n.display();
    }
    for (const l of this.lines) {
      l.display();
    }
    for (const o of this.outLines) {
      o.display();
    }
  }
}


let c1;
let c2;
function setup() {
  createCanvas(400, 400);
  physics = new VerletPhysics2D();
  c1 = new Cluster(10, 100, new Vec2D(width / 3, height / 3));
  c2 = new Cluster(15, 100, new Vec2D(width * 2 / 3, height * 2/ 3));
  c1.connect(c2);
}

function draw() {
  physics.update();
  background(255);
  c1.display();
  c2.display();
}
