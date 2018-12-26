
function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  if(!isReady()) {
    showTimer();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
