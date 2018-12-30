var stasio;
var scl;
var sound;
var counter;
var prev_vol;
var sum;
var slider;
var debug_mode = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
  sound = new p5.AudioIn();
  sound.start();
  counter = 0;
  prev_vol = 0;
  sum = 0;
  slider = createSlider(0.0001, 0.005, 0.0001, 0.00005);
  slider.position(20, -50);
  slider.style("width", "175px");
}

function draw() {
  if(!isReady()) {
    showTimer();
  } else if(isRunning_timer) {
    afterCounting();
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

      let vol = sound.getLevel();
      let delta = vol-prev_vol;
      if(delta < 0) {
        delta = 0;
      }
      sum++;
      if(delta>slider.value() && sum > 7) {
        sum = 0;
        stasio.changePose();
        stasio.changeDance();
      }
      prev_vol = vol;
    }
    counter++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sum = 0;
  counter = 0;
  prev_vol = 0;
  refreshStasio();
}

function refreshStasio() {
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
}

function keyPressed() {
  if(key == ' ') {
    if(debug_mode) {
      debug_mode = false;
      slider.position(20, -50);
    } else {
      debug_mode = true;
      slider.position(20, 50);
    }
  }
}

function touchStarted() {
  if(debug_mode) {
    debug_mode = false;
    slider.position(20, -50);
  } else {
    debug_mode = true;
    slider.position(20, 50);
  }
}
