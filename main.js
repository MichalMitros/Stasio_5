var stasio;
var scl;
var sound;
var counter;
var prev_vol;
var sum;
var sensitivity_slider;
var show_settings = false;
var last_update = "2/2/2019 13:21";
var version = "5.3_2";
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

  if(frameCount < 600) {
    noStroke();
    fill(225);
    if(height < width) {
      textSize(height/50);
    } else {
      textSize(width/50);
    }
    text("Move cursor to the edge and", 50, height/2-100);
    text("click to open settings! :D", 50, height/2-75);
    stroke(255);
    noFill();
    strokeWeight(2);
    arc(80, height/2-50, 80, 80, 0, HALF_PI);
    line(80, height/2-10, 90, height/2);
    line(80, height/2-10, 90, height/2-20);
  }

  noFill();
  stroke(255);
  strokeWeight(1);
  if(show_settings) {
    translate(width/2+180, height/2);
  } else {
    translate(width/2, height/2);
  }


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
    if(stasio.getMultiplier()*delta>0.0051-sensitivity_slider.value() && sum > 7) {
      sum = 0;
      stasio.changePose();
      stasio.changeDance();
    }
    prev_vol = vol;
  }
  counter++;

  if(show_settings) {
    translate(-width/2-180, -height/2);
  } else {
    translate(-width/2, -height/2);
  }
  if(show_settings) {
    showSettings();
  } else if(mouseX < 64 && mouseX >= 0 &&
            mouseY >= height/4 && mouseY <= height-height/4) {
    noStroke();
    fill(32);
    rect(-5, height/4, 29, height/2, 5);
    stroke(128);
    strokeWeight(2);
    line(6, height/2-12, 18, height/2);
    line(6, height/2+12, 18, height/2);
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

function mousePressed() {
  if(show_settings && mouseX >= 360 && mouseY >= 0 && mouseY <= height) {
    show_settings = false;
    sensitivity_slider.position(20, -50);
    animations.position(20, -50);
    changeDances.position(20, -50);
  } else if(mouseX < 24 && mouseX >= 0 && mouseY >= height/4 && mouseY <= height-height/4) {
    show_settings = true;
    sensitivity_slider.position(20, 50);
    animations.position(35, 100);
    changeDances.position(35, 150);
  }
}
