const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
const Vec2D = toxi.geom.Vec2D;
const Rect = toxi.geom.Rect;

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

let physics;
let particles = [];
let len = 10;
let numParticles = 20;

function setup() {
  createCanvas(400, 800);
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  for (let i = 0; i < numParticles; i++) {
    const p = new Particle(new Vec2D(i * len + width / 2, 10));
    physics.addParticle(p);
    particles.push(p);

    if (i !== 0) {
      const pre = particles[i - 1];
      const spring = new VerletSpring2D(p, pre, len, 0.01);
      physics.addSpring(spring);
    }
  }
  const head = particles[0];
  head.lock();
}

function draw() {
  physics.update();
  background(255);

  stroke(0);
  noFill();
  beginShape();
  for(const p of particles) {
    vertex(p.x, p.y);
  }
  endShape();

  const tail = particles[numParticles - 1];
  tail.display();
}

function mousePressed() {
  const tail = particles[numParticles - 1];
  tail.lock();
  tail.x = mouseX;
  tail.y = mouseY;
  tail.unlock();
}
