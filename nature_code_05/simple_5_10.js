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
let p1;
let p2;

function setup() {
  createCanvas(400, 300);
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  p1 = new Particle(new Vec2D(100, 20));
  p2 = new Particle(new Vec2D(100, 180));
  console.log({ p1 });
  p1.lock();

  const spring = new VerletSpring2D(p1, p2, 80, 0.01);
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);
}

function draw() {
  physics.update();
  background(255);

  line(p1.x, p1.y, p2.x, p2.y);
  p1.display();
  p2.display();
}

function mousePressed() {
  p2.lock();
  p2.x = mouseX;
  p2.y = mouseY;
  p2.unlock();
}
