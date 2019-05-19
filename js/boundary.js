class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }

  show() {
    strokeWeight(3);
    stroke(55, 55, 89);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

}
