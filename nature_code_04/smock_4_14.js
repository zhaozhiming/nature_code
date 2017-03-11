class Particle {
  constructor(location) {
    this.acceleration = createVector();
    const vx = gaussion() * 0.3;
    const vy = gaussion() * 0.3 - 1.0;
    this.velocity = createVector(vx, vy);
    this.location = location;
    this.lifespan = 255.0;
    this.mass = 1;
  }

  run(img) {
    this.update();
    this.display(img);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  display(img) {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.location.x, this.location.y);
  }

  applyForce(force) {
    const f = createVector(force.x, force.y).div(this.mass);
    this.acceleration.add(f);
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

  addParticle() {
    const position = createVector(this.origin.x, this.origin.y);
    this.particles.push(new Particle(position));
  }

  size() {
    return this.particles.length;
  }

  run(img) {
    for(const p of this.particles) {
      p.run(img);
    }
    this.particles = this.particles.filter(x => !x.isDead());
  }

  applyForce(force) {
    for(const p of this.particles) {
      p.applyForce(force);
    }
  }
}


let img;
let lifespan;

function setup() {
  createCanvas(400, 400, P2D);
  ps = new ParticlesSystem(createVector(width / 2, height / 2));
  img = loadImage("./texture.png");
}

function draw() {
  blendMode(EXCLUSION);
  background(0);
  const dx = map(mouseX, 0, width, -0.2, 0.2);
  const wind = createVector(dx, 0);
  ps.applyForce(wind);
  ps.addParticle();
  ps.addParticle();

  ps.run(img);

}
