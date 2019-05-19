class Timebar {
  constructor(x, y, width, height, maxTime) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = height;
    this.barHeight = 10;
    this.maxTime = maxTime;
    this.stepSpeed = 0.5;
    this.currentTime = maxTime;
  }
  
  isOver() {
    return (this.currentTime <= 0)
  }

  reset() {
    this.currentTime = this.maxTime;
  }

  update() {
    this.currentTime -= this.stepSpeed;
  }
  
  show() {
    fill(115, 116, 140);
    rect(this.pos.x, this.pos.y - this.barHeight, this.width * (this.currentTime / this.maxTime), this.barHeight);
  }

}