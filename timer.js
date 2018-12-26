var timer_color = 255;

function isReady() {
  return moment().year() === 2019;
}

function showTimer() {
  textAlign(CENTER);
  if(height < width) {
    textSize(height/6);
  } else {
    textSize(width/6);
  }
  background(0);
  let time = floor(moment().endOf('year').diff(moment()) / 1000);
  let hours = floor(time / 3600) + "";
  let minutes = floor((time / 60) % 60) + "";
  let seconds = floor(time % 60) + "";
  if(hours.length < 2) {
    hours = "0" + hours;
  }
  if(minutes.length < 2) {
    minutes = "0" + minutes;
  }
  if(seconds.length < 2) {
    seconds = "0" + seconds;
  }
  if(hours == "00") {
    fill(255, 0, 0);
    stroke(255, 0, 0);
  } else {
    fill(255);
    stroke(255);
  }
  let output = hours + ":" + minutes + ":" + seconds;
  if(height < width) {
    text(output, width/2, height/2 + height/24);
  } else {
    text(output, width/2, height/2 + width/24);
  }

}
