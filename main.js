var stasio;
var scl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
}

function draw() {
  if(isReady()) {
    showTimer();
  } else {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(1);
    translate(width/2, height/2);
    if(stasio.isAnimated) {
      stasio.animate();
    } else {
      stasio.show();
      if(frameCount%60 == 0) {
        stasio.changePose();
      }

    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  refreshStasio();
}

function refreshStasio() {
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
}
