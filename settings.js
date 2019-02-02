var _fps = 60;

function showSettings() {
  textSize(20);
  fill(48);
  noStroke();
  rect(0, 0, 360, height);
  strokeWeight(10);
  fill(32);
  rect(360, 0, 6, height);
  rect(360, height/4, 24, height/2, 5);
  stroke(128);
  strokeWeight(2);
  line(366, height/2, 378, height/2-12);
  line(366, height/2, 378, height/2+12);
  fill(255);
  noStroke();
  strokeWeight(1);
  text("Sensitivity: "+floor(map(sensitivity_slider.value(), 0.00005, 0.005, 0, 100))+"%", 37, 40);
  text("animations", 65, 118);
  text("changing dances", 65, 168);

  if(height > 420) {
    textSize(14);
    text("dance_id: "+stasio.present_dance, 40, 240);
    text("pose_id: "+stasio.present_pose, 40, 265);
    if(animations.checked()) {
      text("dance_animations: "+stasio.dances[stasio.present_dance].isAnimated, 40, 290);
      if(stasio.dances[stasio.present_dance].isAnimated) {
        text("dance_smoothness: "+stasio.dances[stasio.present_dance].animation_steps, 40, 315);
      }
    } else {
      text("dance_animations: false", 40, 290);
    }
  }


  textSize(20);
  text("Last update: "+last_update, 37, height-60);
  text("Version: "+version, 37, height-30);

  if(frameCount%30 == 0) {
    _fps = round(frameRate());
  }
  if(_fps >= 40) {
    fill(0, 255, 0);
    stroke(0, 255, 0);
  } else if(_fps >= 30) {
    fill(255, 255, 0);
    stroke(255, 255, 0);
  } else {
    fill(255, 0, 0);
    stroke(255, 0, 0);
  }
  text(_fps+" FPS", 260, height-30);
}
