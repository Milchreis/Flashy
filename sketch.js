// Nick Mueller
// Inspired by Daniel Shiffman's 2D Ray-Casting and steering code challanges

const NUMBER_OF_WALLS = 5;
const NUMBER_OF_ENEMIES = 5;
const TIME_TO_LIVE = 1000;

let player;
let walls = [];
let enemies = [];
let target;
let points = 0;
let timebar;

function setup() {
  let canvas =  createCanvas(800, 400);
  canvas.parent('sketch-holder');
  resetGame();
}

function resetGame() {
  walls = [];
  for (let i = 0; i < NUMBER_OF_WALLS; i++) {
    walls.push(new Boundary(random(width), random(height), random(width), random(height)));
  }
  
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  
  enemies = [];
  for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
    enemies.push(new Enemy(random(width), random(height)));
  }
  
  timebar = new Timebar(0, height, width, height, TIME_TO_LIVE);
  
  player = new Player();
  target = new Treasure(random(width), random(height));

  points = 0;
}

function moveByTo(keys, x, y) {
  for (let key of keys) {
    if (keyIsDown(key) && !player.collidesIn(walls, x, y)) {
      if (x === 0) {
        player.pos.y += y;
      } else {
        player.pos.x += x;
      }
    }
  }
}

function updateControlls() {
  if(!player.isAlive)
    return;

  let speed = 2;
  moveByTo([UP_ARROW, 87], 0, -speed);
  moveByTo([DOWN_ARROW, 83], 0, speed);
  moveByTo([LEFT_ARROW, 65], -speed, 0);
  moveByTo([RIGHT_ARROW, 68], speed, 0);
}

function mouseMoved() {
  if(player.isAlive)
    player.lookAt(mouseX, mouseY);
}

function mousePressed() {
  if(!player.isAlive)
    resetGame();
}

function gameover() {
  for(let enemy of enemies) {
    enemy.isAlive = false;
    enemy.isVisible = true;
    enemy.show();
  }

  for(let wall of walls)
    wall.show();

  target.isVisible = true;
  target.show();

  player.isAlive = false;
}

function levelUp() {
  points++;
  target = new Treasure(random(width), random(height));
  enemies.push(new Enemy(random(width), random(height)));
  timebar.reset();  
}

function draw() {
  background(30);
  updateControlls();

  player.update(walls);
  player.show();

  for(let enemy of enemies) {
    enemy.update(player, walls);
    enemy.show();

    if(player.collidesWith(enemy) || timebar.isOver()) {
      gameover();
    }
  }

  target.update(player);
  target.show();

  if(player.collidesWith(target)) {
    levelUp();
  }

  if(player.isAlive) {
    timebar.update();
  }

  timebar.show();

  fill(255);
  text(points, width - 20, 20);
}
