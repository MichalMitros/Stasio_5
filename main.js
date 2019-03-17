var stasio;
var scl;
var sound;
var counter;
var prev_vol;
var sum;
var sensitivity_slider;
var dance_frequency_slider;
var show_settings = false;
var last_update = "17/3/2019 16:52";
var version = "5.3_6";
var tip_text_brightness = 255;
var facebook_button;
var github_button;
var tips_time = 600;

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
  sensitivity_slider.class("slider");
  dance_frequency_slider = createSlider(-0.002, 0.102, 0.05, 0.026);
  dance_frequency_slider.position(20, -50);
  dance_frequency_slider.class("slider");
  facebook_button = createA('https://www.facebook.com/Stasio-Project-2080663728643430/' , 'Facebook', '_blank');
  facebook_button.class('facebook');
  facebook_button.position(20, -50);
  github_button = createA('https://github.com/MichalMitros/Stasio_5' , 'Github', '_blank');
  github_button.class('github');
  github_button.position(20, -50);
}

function draw() {
  background(0);

  if(tips_time >= 0) {
    if(tips_time < 256) {
      tip_text_brightness--;
    }
    if(height < width) {
      textSize(height/40);
    } else {
      textSize(width/40);
    }
    stroke(0);
    fill(tip_text_brightness);
    textAlign(RIGHT);
    text("Press F to turn on/off fullscreen mode", width-30, height-30);
    textAlign(LEFT);
    tips_time--;
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
    if((stasio.getMultiplier()*delta>0.0051-sensitivity_slider.value() && sum > 7)
        || stasio.dances[stasio.present_dance].poses[stasio.present_pose].isTransitional === true) {
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
            mouseY >= height/4 && mouseY <= height-height/4 && focused) {
    noStroke();
    fill(32);
    rect(-5, height/4, 29, height/2, 5);
    stroke(128);
    strokeWeight(2);
    line(6, height/2-12, 18, height/2);
    line(6, height/2+12, 18, height/2);
  }

  // fill(15, 15, 60);
  // noStroke();
  // textSize(50);
  // text("TEST VERSION", width-400, 70);
}

function windowResized() {
  if(!fullscreen()) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(displayWidth, displayHeight);
  }
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
      dance_frequency_slider.position(20, -50);
      facebook_button.position(20, -50);
      github_button.position(20, -50);
    } else {
      show_settings = true;
      sensitivity_slider.position(20, 50);
      dance_frequency_slider.position(20, 110);
      facebook_button.position(180, height - 130);
      github_button.position(20, height - 130);
    }
  }
  if(key == 'f') {
    var fs = fullscreen();
    fullscreen(!fs);
    windowResized();
    if(!fs) {
      tips_time = 600;
      tip_text_brightness = 255;
    }
    redraw();
  }
}

function mousePressed() {
  if(show_settings && mouseX >= 360 && mouseY >= 0 && mouseY <= height) {
    show_settings = false;
    sensitivity_slider.position(20, -50);
    dance_frequency_slider.position(20, -50);
    facebook_button.position(20, -50);
    github_button.position(20, -50);
  } else if(mouseX < 24 && mouseX >= 0 && mouseY >= height/4 && mouseY <= height-height/4) {
    show_settings = true;
    sensitivity_slider.position(20, 50);
    dance_frequency_slider.position(20, 110);
    facebook_button.position(180, height - 130);
    github_button.position(20, height - 130);
  }
}
