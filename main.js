var stasio;
var scl;
var sound;
var counter;
var prev_vol;
var sum;
var sensitivity_slider;
var show_settings = false;
var last_update = "8/1/2019 22:54";
var version = "5.2_8";
var animations;
var changeDances;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
  sound = new p5.AudioIn();
  sound.start();
  counter = 0;
  prev_vol = 0;
  sum = 0;
  sensitivity_slider = createSlider(0.0001, 0.005, 0.005, 0.00005);
  sensitivity_slider.position(20, -50);
  sensitivity_slider.style("width", "300px");
  animations = createCheckbox('', true);
  animations.position(20, -50);
  changeDances = createCheckbox('', true);
  changeDances.position(20, -50);
}

function draw() {
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
    if(delta>0.0051-sensitivity_slider.value() && sum > 7) {
      sum = 0;
      stasio.changePose();
      stasio.changeDance();
    }
    prev_vol = vol;
  }
  counter++;

  if(show_settings) {
    showSettings();
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
  let pose = stasio.present_pose;
  let dance = stasio.present_dance;
  stasio = new Stasio(createDances(), scl);
  stasio.present_dance = dance;
  stasio.present_pose = pose;
}

function keyPressed() {
  if(key == ' ') {
    if(show_settings) {
      show_settings = false;
      sensitivity_slider.position(20, -50);
      animations.position(20, -50);
      changeDances.position(20, -50);
    } else {
      show_settings = true;
      sensitivity_slider.position(20, 50);
      animations.position(35, 100);
      changeDances.position(35, 150);
    }
  }
}

function touchEnded() {
  if(show_settings) {
    show_settings = false;
    sensitivity_slider.position(20, -50);
    animations.position(20, -50);
    changeDances.position(20, -50);
  } else {
    show_settings = true;
    sensitivity_slider.position(20, 50);
    animations.position(35, 100);
    changeDances.position(35, 150);
  }
}
