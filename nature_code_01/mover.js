class Mover {
  constructor() {
    this.location = createVector(random(width / 2), random(height / 2));
    this.velocity= createVector(random(-2, 2), random(-2, 2));
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(map(noise(0.01), 0, 1, -0.01, 0.01));
    this.topSpeed = 10;
    this.distance = createVector(1, 1);
  }

  update() {
    const mouse = createVector(mouseX, mouseY);
    const dir = p5.Vector.sub(mouse, this.location);
    dir.setMag(0.5);
    this.acceleration = dir;

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
  createCanvas(500, 500);
  smooth();
  mover = new Mover();
}

function draw() {
  background(255);
  mover.update();
  mover.checkEdges();
  mover.display();
  console.log({ mag: mover.velocity.mag() });
}

function keyPressed() {
   if (keyCode === UP_ARROW) {
     mover.velocity.add(createVector(1, 1));
   } else if (keyCode === DOWN_ARROW) {
     mover.velocity.sub(createVector(1, 1));
   }
}
