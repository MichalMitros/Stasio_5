var stasio;
var scl;
var sound;
var counter;
var prev_vol;
var sum;
var sensitivity_slider;
var dance_frequency_slider;
var show_settings = false;
var last_update = "30/4/2019 00:27";
var version = "5.4";
var tip_text_brightness = 255;
var facebook_button;
var github_button;
var change_dance_button;
var fullscreen_button;
var tips_time = 600;
var prev_mouseX;
var prev_mouseY;
var use_localStorage;
p5.disableFriendlyErrors = true;

function preload() {
  if (typeof(Storage) !== "undefined") {
    use_localStorage = true;
  } else {
    alert("Sorry!\nYour browser does not meet the minimum requirements.\nSome features will be unavailable.");
    use_localStorage = false;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scl = windowHeight/16.5;
  stasio = new Stasio(createDances(), scl);
  sound = new p5.AudioIn();
  sound.start();
  counter = 0;
  prev_vol = 0;
  sum = 0;
  sensitivity_slider = createSlider(0.00001, 0.0005, 0.0001, 0.000005);
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
  change_dance_button = createButton('Next dance');
  change_dance_button.class('nextdance');
  change_dance_button.position(20, -50);
  change_dance_button.mousePressed(nextDance);
  fullscreen_button = createButton('OFF');
  fullscreen_button.class('nextdance');
  fullscreen_button.position(20, -50);
  fullscreen_button.mousePressed(toggleFullscreen);
  prev_mouseX = mouseX;
  prev_mouseY = mouseY;

  getDataFromLocalStorage();
  background(0);
}

function draw() {
  background(0);
  frameRate(60);
  if(frameCount % 120 == 0) {
    if(mouseX === prev_mouseX && mouseY === prev_mouseY && !show_settings) {
      noCursor();
    } else {
      cursor('default');
    }
    prev_mouseX = mouseX;
    prev_mouseY = mouseY;
  }

  // if(tips_time >= 0) {
  //   if(tips_time < 256) {
  //     tip_text_brightness--;
  //   }
  //   if(height < width) {
  //     textSize(height/40);
  //   } else {
  //     textSize(width/40);
  //   }
  //   stroke(0);
  //   fill(tip_text_brightness);
  //   textAlign(RIGHT);
  //   text("Press F to turn on/off fullscreen mode", width-30, height-30);
  //   textAlign(LEFT);
  //   tips_time--;
  // }

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
    if((delta>0.0081-sensitivity_slider.value() && sum > 9)
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
    if(mouseX >= 360) {
      cursor('pointer');
    } else {
      cursor('default');
    }
  } else if((mouseX < 64 && mouseX >= 0 &&
            mouseY >= height/4 && mouseY <= height-height/4) && focused) {
    noStroke();
    fill(32);
    rect(-5, height/4, 29, height/2, 5);
    stroke(128);
    strokeWeight(2);
    line(6, height/2-12, 18, height/2);
    line(6, height/2+12, 18, height/2);

    if(mouseX >= 0 && mouseX <= 24 && mouseY >= height/4 && mouseY <= 3*height/4) {
      cursor('pointer');
    }

  }

  // fill(30, 30, 120);
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
  if(show_settings) {
    if(height > 376) {
      facebook_button.position(180, height - 130);
      github_button.position(20, height - 130);
      change_dance_button.position(180, 201);
    } else if(height > 327) {
      facebook_button.position(20, -50);
      github_button.position(20, -50);
      change_dance_button.position(180, 201);
    } else {
      facebook_button.position(20, -50);
      github_button.position(20, -50);
      change_dance_button.position(20, -50);
    }
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
      change_dance_button.position(20, -50);
      fullscreen_button.position(20, -50);
    } else {
      show_settings = true;
      sensitivity_slider.position(20, 106);
      dance_frequency_slider.position(20, 166);
      facebook_button.position(180, height - 130);
      github_button.position(20, height - 130);
      change_dance_button.position(180, 201);
      fullscreen_button.position(180, 253);
    }
  }
  if(key == 'f') {
    toggleFullscreen();
  }
}

function mousePressed() {
  if(show_settings && mouseX >= 360 && mouseY >= 0 && mouseY <= height) {
    show_settings = false;
    sensitivity_slider.position(20, -50);
    dance_frequency_slider.position(20, -50);
    facebook_button.position(20, -50);
    github_button.position(20, -50);
    change_dance_button.position(20, -50);
    fullscreen_button.position(180, -50);
  } else if(mouseX < 24 && mouseX >= 0 && mouseY >= height/4 && mouseY <= height-height/4) {
    show_settings = true;
    sensitivity_slider.position(20, 106);
    dance_frequency_slider.position(20, 166);
    facebook_button.position(180, height - 130);
    github_button.position(20, height - 130);
    change_dance_button.position(180, 201);
    fullscreen_button.position(180, 253);
  }
}

function doubleClicked() {
  if(!show_settings && !(mouseX < 24 && mouseX >= 0 &&
            mouseY >= height/4 && mouseY <= height-height/4) && focused) {
    toggleFullscreen();
  }
}

function toggleFullscreen() {
  var fs = fullscreen();
  fullscreen(!fs);
  windowResized();
  if(!fs) {
    tips_time = 600;
    tip_text_brightness = 255;
  }
  redraw();
  updateFullscreenButton();
}

function updateFullscreenButton() {
  fullscreen_button.html(fullscreen() ? 'OFF' : 'ON');
}

function getDataFromLocalStorage() {
  if(use_localStorage) {
    var data;

    data = localStorage.getItem("danceId");
    if(data !== null && data !== undefined) {
      data = parseInt(data);
      if(data >= 0 && data < stasio.dances.length) {
        stasio.present_dance = data;
      }
    }

    data = localStorage.getItem("poseId");
    if(data !== null && data !== undefined) {
      data = parseInt(data);
      if(data >= 0 && data < stasio.dances[stasio.present_dance].length) {
        stasio.present_pose = data;
      }
    }

    data = localStorage.getItem("danceFrequency");
    if(data !== null && data !== undefined) {
      data = Number(data);
      dance_frequency_slider.value(data);
    }

    data = localStorage.getItem("sensitivity");
    if(data !== null && data !== undefined) {
      data = Number(data);
      sensitivity_slider.value(data);
    }
  }
}

function saveDataToLocalStorage() {
  if(use_localStorage) {
    localStorage.setItem("danceId", stasio.present_dance);
    localStorage.setItem("poseId", stasio.present_pose);
    localStorage.setItem("danceFrequency", dance_frequency_slider.value());
    localStorage.setItem("sensitivity", sensitivity_slider.value());
  }
}

function mouseMoved() {
  cursor('default');
}

function nextDance() {
  stasio.nextDance();
}
