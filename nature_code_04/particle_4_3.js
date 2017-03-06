class Particle {
  constructor(location) {
    this.acceleration = createVector();
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.location = location;
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
  }

  display() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    ellipse(this.location.x, this.location.y, 8, 8);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class ParticlesSystem {
  constructor(origin) {
    this.particles = [];
    this.origin = origin;
  }

  addParticle(x, y) {
    this.particles.push(new Particle(createVector(x, y)));
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
}

let ps;

function setup() {
  createCanvas(400, 400);
  ps = new ParticlesSystem(createVector(width / 2, height / 2));
}

function draw() {
  background(255);
  ps.addParticle(mouseX, mouseY);
  ps.run();
}
