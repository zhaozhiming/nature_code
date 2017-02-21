function drawImage(step) {
  img.loadPixels();
  let xoff = 0;
  for(let x = 0; x < width; x++) {
    let yoff = 0;
    for(let y = 0; y < height; y++) {
      noiseDetail(3, 0.5);
      const bright = map(noise(xoff, yoff, step), 0, 1, 0, 255);
      img.set(x, y, color(bright));
      yoff += 0.01;
    }
    xoff += 0.01;
  }
  img.updatePixels();
  image(img, 30, 17);
}

function setup() {
  createCanvas(640, 360);
  this.img = createImage(200, 200);
}

let step = 0;
function draw() {
  drawImage(step);
  step += 0.1;
}
