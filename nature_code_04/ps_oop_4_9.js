class Particle {
  constructor(location) {
    this.acceleration = createVector();
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.location = location;
    this.lifespan = 255.0;
    this.mass = 1;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  display() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    ellipse(this.location.x, this.location.y, 8, 8);
  }

  applyForce(force) {
    const f = createVector(force.x, force.y).div(this.mass);
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class Confetti extends Particle {
  display() {
    const theta = map(this.location.x, 0, width, 0, Math.PI * 2);

    rectMode(CENTER);
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    rect(0, 0, 8, 8);
    pop();
  }
}

class ParticlesSystem {
  constructor(origin) {
    this.particles = [];
    this.origin = origin;
  }

  addParticle() {
    const position = createVector(this.origin.x, this.origin.y);
    const r = random();
    if (r < 0.5) {
      this.particles.push(new Particle(position));
    } else {
      this.particles.push(new Confetti(position));
    }
  }

  size() {
    return this.particles.length;
  }

  run() {
    for(const p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(x => !x.isDead());
  }

  applyForce(force) {
    for(const p of this.particles) {
      p.applyForce(force);
    }
  }

  applyRepeller(r) {
    for(const p of this.particles) {
      const force = r.repel(p);
      p.applyForce(force);
    }
  }
}

class Repeller {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.stress = 100;
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, 20, 20);
  }

  repel(p) {
    const dir = p5.Vector.sub(this.location, p.location);
    let d = dir.mag();
    d = constrain(d, 5, 100);
    dir.normalize();
    const force = -1 * this.stress / (d * d);
    dir.mult(force);
    return dir;
  }
}

let ps;
let rs = [];
function setup() {
  createCanvas(400, 400);
  ps = new ParticlesSystem(createVector(width / 2, height / 2));
  rs.push(new Repeller(width / 2 - 20, height / 2));
  rs.push(new Repeller(width / 2 + 20, height / 2));
}

function draw() {
  background(255);
  ps.addParticle();
  const g = createVector(0, 0.1);
  ps.applyForce(g);
  for (const repeller of rs) {
    ps.applyRepeller(repeller);
    repeller.display();
  }
  ps.run();
}
