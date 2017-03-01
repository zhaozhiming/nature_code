p5.Vector.prototype.limit = function limit(max) {
  if (this.mag() > max) {
    this.setMag(max);
  }
};

class Mover {
  constructor() {
    this.location = createVector(random(width / 2), random(height / 2));
    this.velocity= createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(-0.001, 0.001);
    this.topSpeed = 10;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, 16, 16);
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }
    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}

let mover;

function setup() {
  createCanvas(200, 200);
  smooth();
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.display();
}


