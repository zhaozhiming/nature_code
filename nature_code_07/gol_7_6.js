class GameOfLife {
  constructor() {
    this.w = 10;
    this.board = new Array(width / this.w);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(height / this.w);
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = Math.floor(Math.random() * 2);
      }
    }
  }

  generate() {
    const nextgen = new Array(this.board.length);
    for (let i = 0; i < nextgen.length; i++) {
      nextgen[i] = this.board[i];
      for (let j = 0; j < nextgen[i].length; j++) {
        nextgen[i][j] = Math.floor(Math.random() * 2);
      }
    }

    for (let x = 1; x < this.board.length - 1; x++) {
      nextgen[x] = new Array(this.board[x].length);
      for (let y = 1; y < this.board[x].length - 1; y++) {
        const neighbors = this.rules(x, y);
        if (this.board[x][y] === 1 && neighbors < 2) {
          nextgen[x][y] = 0;
        } else if (this.board[x][y] === 1 && neighbors > 3) {
          nextgen[x][y] = 0;
        } else if (this.board[x][y] === 0 && neighbors === 3) {
          nextgen[x][y] = 1;
        } else {
          nextgen[x][y] = this.board[x][y];
        }
      }
    }
    this.board = nextgen;
  }

  rules(x, y) {
    let neighbors = 0;
    if (this.board[x - 1][y - 1] === 1) neighbors += 1;
    if (this.board[x][y - 1] === 1) neighbors += 1;
    if (this.board[x + 1][y - 1] === 1) neighbors += 1;

    if (this.board[x - 1][y] === 1) neighbors += 1;
    if (this.board[x + 1][y] === 1) neighbors += 1;

    if (this.board[x - 1][y + 1] === 1) neighbors += 1;
    if (this.board[x][y + 1] === 1) neighbors += 1;
    if (this.board[x + 1][y + 1] === 1) neighbors += 1;
    return neighbors;
  }

  display() {
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        fill(this.board[x][y] === 1 ? 0: 255);
        rect(x * this.w, y * this.w, this.w, this.w);
      }
    }
  }
}

let gol;
function setup() {
  createCanvas(400, 400);
  gol = new GameOfLife();
}

function draw() {
  gol.display();
}

function mousePressed() {
  gol.generate();
}
