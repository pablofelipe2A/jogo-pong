let leftPaddle, rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('game-container');

  leftPaddle = new Paddle(10, height / 2 - 50);
  rightPaddle = new Paddle(width - 20, height / 2 - 50);
  ball = new Ball();
}

function draw() {
  background(0);

  // Draw the paddles
  leftPaddle.show();
  rightPaddle.show();

  // Move paddles
  leftPaddle.move();
  rightPaddle.move();

  // Draw and move the ball
  ball.show();
  ball.update();
  ball.checkEdges();
  ball.checkPaddle(leftPaddle);
  ball.checkPaddle(rightPaddle);

  // Display scores
  fill(255);
  textSize(32);
  text(leftScore, 50, 50);
  text(rightScore, width - 80, 50);

  // Control paddles
  if (keyIsDown(87)) { // W key
    leftPaddle.y -= 5;
  }
  if (keyIsDown(83)) { // S key
    leftPaddle.y += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.y += 5;
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 100;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.y = constrain(this.y, 0, height - this.h);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 12;
    this.xSpeed = 5;
    this.ySpeed = 3;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkEdges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    if (this.x < 0) {
      rightScore++;
      this.reset();
    }

    if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed *= -1;
  }

  checkPaddle(paddle) {
    if (this.y > paddle.y && this.y < paddle.y + paddle.h) {
      if (this.x - this.r < paddle.x + paddle.w && this.x + this.r > paddle.x) {
        this.xSpeed *= -1;
      }
    }
  }
}
