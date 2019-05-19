class Mob {
  constructor(x, y, xSpeed, ySpeed) {
    this.pos = createVector(x, y);
    this.velocity = createVector(xSpeed, ySpeed);
    this.isAlive = true;
    this.size = 10;
    this.isVisible = false;
  }

  update() {
  }

  show() {
  }

  collidesIn(walls, xOffset, yOffset, size) {
    for (let wall of walls) {
      let isColliding = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, this.pos.x + xOffset, this.pos.y + yOffset, size);
      if (isColliding)
        return true;
    }
    return false;
  }
}

class Treasure extends Mob {
  constructor(x, y) {
    super(x, y, 0, 0);
  }

  update(player) {
    this.isVisible = player.isInViewField(this.pos.x, this.pos.y, this.size);
  }

  show() {
    if (this.isVisible) {
      noStroke();
      fill(6, 182, 209);
      circle(this.pos.x, this.pos.y, this.size);
    }
  }
}

class Enemy extends Mob {
  constructor(x, y) {
    super(x, y, 2, 2);
    this.maxSpeed = random(0.3, 0.5);
  }

  update(player, walls) {
    if(!this.isAlive)
      return
    
    this.isVisible = player.isInViewField(this.pos.x, this.pos.y, this.size);

    let desired = p5.Vector.sub(player.pos, this.pos);
    desired.normalize();
    desired.mult(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxSpeed);

    if (!this.collidesIn(walls, this.velocity.x + steer.x, this.velocity.y + steer.y, this.size)) {
      this.velocity.add(steer);
      this.pos.add(this.velocity);
    }
  }

  show() {
    if (this.isVisible) {
      noStroke();
      fill(185, 6, 209);
      circle(this.pos.x, this.pos.y, this.size);
    }
  }
}