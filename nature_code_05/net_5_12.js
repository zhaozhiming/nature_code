const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
const Vec2D = toxi.geom.Vec2D;
const Rect = toxi.geom.Rect;

let physics;

class Particle extends VerletParticle2D {
  constructor(loc) {
    super(loc);
  }

  display() {
    fill(175);
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

class Net {
  constructor() {
    this.w = 30;
    this.h = 30;
    this.particles = [];
    this.springs = [];
    this.len = 10;
    this.strength = 0.25;

    for(let y = 0; y < this.h; y++) {
      for(let x = 0; x < this.w; x++) {

        const p = new Particle(new Vec2D(width / 2 + x * this.len - this.w * this.len / 2, y * this.len));
        physics.addParticle(p);
        this.particles.push(p);

        if (x > 0) {
          const previous = this.particles[this.particles.length - 2];
          const c = new Connection(p, previous, this.len, this.strength);
          physics.addSpring(c);
          this.springs.push(c);
        }

        if (y > 0) {
          const above = this.particles[this.particles.length - this.w - 1];
          const c =new Connection(p, above, this.len, this.strength);
          physics.addSpring(c);
          this.springs.push(c);
        }
      }
    }

    const head = this.particles[0];
    head.lock();
    const tail = this.particles[this.w - 1];
    tail.lock();
  }

  display() {
    for (const c of this.springs) {
      c.display();
    }
  }
}

let net;
function setup() {
  createCanvas(400, 600);
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
  net = new Net();
}

function draw() {
  physics.update();
  background(255);
  net.display();
}
