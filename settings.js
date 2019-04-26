var _fps = 60;

function showSettings() {
  noStroke();
  strokeWeight(10);
  fill(32);
  rect(-50, 0, 416, height, 16, 16);
  rect(360, height/4, 24, height/2, 5);
  fill(48);
  rect(6, 56, 354, height-62, 16, 16);
  stroke(128);
  strokeWeight(2);
  line(366, height/2, 378, height/2-12);
  line(366, height/2, 378, height/2+12);
  fill(255);
  noStroke();
  strokeWeight(1);
  textSize(38);
  textAlign(CENTER);
  text("Stasio", 180, 42);
  textSize(20);
  textAlign(LEFT);
  text("Sensitivity: "+floor(map(sensitivity_slider.value(), 0.00001, 0.0005, 1, 100))+"%", 37, 96);
  let freq_text = "";
  let freq = dance_frequency_slider.value();
  if(freq > 0.1) {
    freq_text = "very often";
  } else if(freq > 0.075) {
    freq_text = "often";
  } else if(freq > 0.045) {
    freq_text = "normally";
  } else if(freq > 0.022) {
    freq_text = "rarely";
  } else {
    freq_text = "never";
  }
  text("Change dance: " + freq_text, 37, 156);

  // if(height > 420) {
  //   textSize(14);
  //   text("dance_id: "+stasio.present_dance, 40, 240);
  //   text("pose_id: "+stasio.present_pose, 40, 265);
  //   text("dance_animations: "+stasio.dances[stasio.present_dance].isAnimated, 40, 290);
  //   if(stasio.dances[stasio.present_dance].isAnimated) {
  //     text("dance_smoothness: "+stasio.dances[stasio.present_dance].animation_steps, 40, 315);
  //   }
  // }


  textSize(20);
  text("Last update: "+last_update, 20, height-60);
  text("Version: "+version, 20, height-30);

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
