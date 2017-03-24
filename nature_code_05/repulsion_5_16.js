const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D;
const Vec2D = toxi.geom.Vec2D;
const AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;


let physics;
class Particl extends VerletParticle2D {
  constructor(loc) {
    super(loc);
    this.r = 8;
    physics.addBehavior(new AttractionBehavior(this, this.r * 2, -1));
    physics.addBehavior(new AttractionBehavior(this, width, 0.1));
  }

  display() {
    fill(0);
    stroke(0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

class Node extends VerletParticle2D {
  constructor(loc) {
    super(loc);
  }

  display() {
    fill(0, 150);
    stroke(0);
    ellipse(this.x, this.y, 4, 4);
  }
}

class Cluster {
  constructor(n, d, center) {
    this.nodes = [];
    this.d = d;
    for(let i = 0; i < n; i++) {
      this.nodes.push(new Node(center.add(Vec2D.randomVector())));
    }

    for(let i = 0; i < this.nodes.length - 1; i++) {
      const ni = this.nodes[i];
      for(let j = i + 1; j < this.nodes.length; j++) {
        const nj = this.nodes[j];
        const c = new VerletSpring2D(ni, nj, this.d, 0.01);
        physics.addSpring(c);
      }
    }
  }

  display() {
    for (const n of this.nodes) {
      n.display();
    }
  }
}

let c;
let p;
function setup() {
  createCanvas(400, 400);
  physics = new VerletPhysics2D();
  c = new Cluster(100, 100, new Vec2D(width / 3, height / 3));
  p = new Particl(new Vec2D(width / 3, height / 3));
}

function draw() {
  physics.update();
  background(255);
  c.display();
  p.display();
}
