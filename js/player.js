class Player extends Mob {
  constructor() {
    super(width / 2, height / 2, 0, 0);
    this.lightConeInDegree = 70;
    this.rays = [];
    this.createRaysFromAngle(0, this.lightConeInDegree, 1);
  }

  createRaysFromAngle(angle, lightConeInDegree, steps) {
    this.rays = [];
    let halfCone = lightConeInDegree/2;
    for (let a = -halfCone; a < halfCone; a += steps) {
      this.rays.push(new Ray(this.pos, angle + radians(a)));
    }
  }

  update(walls) {
    this.castRays(walls);
  }

  lookAt(x, y) {
    let angle = atan2(y - this.pos.y, x - this.pos.x);
    this.createRaysFromAngle(angle, this.lightConeInDegree, 1);
  }

  castRays(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
            ray.end = pt;
          }
        }
      }
    }
  }

  show() {
    let flickerPossiblity = 0.03;
    noStroke(255);
    fill(244, 206, 66, random(1) < flickerPossiblity ? 200 : 255);
    beginShape();
    vertex(this.pos.x, this.pos.y);
    
    for (let ray of this.rays) {
      if(ray.end) {
        vertex(ray.end.x, ray.end.y);
      }
    }
    endShape(CLOSE);

    fill(255);
    circle(this.pos.x, this.pos.y, this.size);
  }

  collidesIn(walls, xOffset, yOffset) {
    for(let wall of walls) {
      let isColliding = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, this.pos.x + xOffset, this.pos.y + yOffset, this.size);
      if(isColliding)
        return true;
      }
      return false;
  }

  collidesWith(mob) {
    return collideCircleCircle(this.pos.x, this.pos.y, this.size, mob.pos.x, mob.pos.y, mob.size)
  }

  isInViewField(x, y, size) {
    for (let ray of this.rays) {
      if (!ray || !ray.pos || !ray.end)
        return

      if (collideLineCircle(ray.pos.x, ray.pos.y, ray.end.x, ray.end.y, x, y, size)) {
        return true;
      }
    }
    return false;
  }
}
