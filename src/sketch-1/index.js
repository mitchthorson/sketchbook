import './style.css';
import '../reset.css';

var i;

const setup = () => {
  createCanvas(800,600);
  i = 0;
  return {};
};

const draw = () => {
  i+=1;
  background(20,20,20);
  for (var c = 0; c < 800/20; c+=1) {
    new Circle(i, 0 ,c * 20);
  }
  // let c = new Circle(i);
  // let c2 = new Circle(i, 20);
};

class Circle {
  constructor(i, row, offset=0) {
    this.i = i;
    this.offset = offset;
    this.row = row;
    this.render();
  }
  render() {
    noFill();
    strokeWeight(2);
    stroke(255, 255, 255);
    ellipse(this._getX(i, 1), 50, this._getWidth(i, 2));
  }
  _getX(i, speed=2, max=800,) {
    let result = (i * speed) + this.offset;
    if (result > max) {
      result = result - 800;
    }
    return result;
  }

  _getWidth(i, base) {
    let steps = 10;
    let index = i;
    let power = index % steps;
    if ((Math.floor(index / 10) % 2) === 0) {
      power = 10 - (power);
    }
    let result = power * base;
    return result;
  }
}

window.setup = setup;
window.draw = draw;