let randomCounts;
function setup() {
  createCanvas(640, 240);
  randomCounts = new Array(20).fill(0);
}

function draw() {
  background(255);
  const index = Math.floor(random(randomCounts.length));
  randomCounts[index]++;

  stroke(0);
  fill(127);
  const w = width / randomCounts.length;

  randomCounts.forEach((x, i) => {
    rect(i * w, height - x, w - 1, x)
  });
}
