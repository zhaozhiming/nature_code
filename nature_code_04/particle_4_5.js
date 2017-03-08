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
    this.lifespan = 255.0;
  }

  addParticle() {
    const position = createVector(this.origin.x, this.origin.y);
    this.particles.push(new Particle(position));
    this.lifespan -= 1.0;
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

class Systems {
  constructor() {
    this.systems= [];
  }

  addPs(x, y) {
    this.systems.push(new ParticlesSystem(createVector(x, y)));
  }

  run() {
    for (const ps of this.systems) {
      ps.addParticle();
      ps.run();
    }
    this.systems = this.systems.filter(x => x.lifespan > 0);
  }
}

let systems;
function setup() {
  createCanvas(400, 400);
  systems = new Systems();
}

function draw() {
  background(255);
  systems.run();
}

function mousePressed() {
  systems.addPs(mouseX, mouseY);
}
