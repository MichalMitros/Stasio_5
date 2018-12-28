var stasio;
var scl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
}

function draw() {
  showTimer();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  refreshStasio();
}

function refreshStasio() {
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
}
