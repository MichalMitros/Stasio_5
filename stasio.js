
class Stasio {

  constructor(dances, scale) {
    this.dances = dances;
    this.scale = scale;
    this.present_dance = floor(random(0, this.dances.length));
    this.present_pose = 0;
    this.prev = undefined;
    this.pres = undefined;
    this.step = 0;
    this.isAnimated = false;
  }

  changeDance() {
    if(!changeDances.checked()) {
      if(random() < 0.05 && counter > 600) {
        this.prev = this.dances[this.present_dance].poses[this.present_pose];
        let id = this.present_dance;
        if(this.dances.length > 1) {
          while((this.present_dance = floor(random(0, this.dances.length))) === id);
        }

        this.present_pose = 0;
        this.pres = this.dances[this.present_dance].poses[this.present_pose];
        if(this.dances[this.present_dance].isAnimated && animations.checked()) {
          this.isAnimated = true;
        }
        counter = 0;
      }
    }
  }

  changePose() {
    this.prev = this.dances[this.present_dance].poses[this.present_pose];
    this.present_pose++;
    if(this.present_pose == this.dances[this.present_dance].poses.length) {
      this.present_pose = 0;
    }
    this.pres = this.dances[this.present_dance].poses[this.present_pose];
    if(this.dances[this.present_dance].isAnimated && animations.checked()) {
      this.isAnimated = true;
    }
  }

  getMultiplier() {
    if(this.dances[this.present_dance].multiplier !== undefined) {
      return this.dances[this.present_dance].multiplier;
    }
    return 1;
  }

  animate() {
    if(this.step < this.dances[this.present_dance].animation_steps) {

      let pose = {
        left_arm_shoulder_x: this.prev.left_arm_shoulder_x + this.step*((this.pres.left_arm_shoulder_x-this.prev.left_arm_shoulder_x)/this.dances[this.present_dance].animation_steps),
        left_arm_shoulder_y: this.prev.left_arm_shoulder_y + this.step*((this.pres.left_arm_shoulder_y-this.prev.left_arm_shoulder_y)/this.dances[this.present_dance].animation_steps),
        left_arm_elbow_x: this.prev.left_arm_elbow_x + this.step*((this.pres.left_arm_elbow_x-this.prev.left_arm_elbow_x)/this.dances[this.present_dance].animation_steps),
        left_arm_elbow_y: this.prev.left_arm_elbow_y + this.step*((this.pres.left_arm_elbow_y-this.prev.left_arm_elbow_y)/this.dances[this.present_dance].animation_steps),
        left_arm_hand_x: this.prev.left_arm_hand_x + this.step*((this.pres.left_arm_hand_x-this.prev.left_arm_hand_x)/this.dances[this.present_dance].animation_steps),
        left_arm_hand_y: this.prev.left_arm_hand_y + this.step*((this.pres.left_arm_hand_y-this.prev.left_arm_hand_y)/this.dances[this.present_dance].animation_steps),
        right_arm_shoulder_x: this.prev.right_arm_shoulder_x + this.step*((this.pres.right_arm_shoulder_x-this.prev.right_arm_shoulder_x)/this.dances[this.present_dance].animation_steps),
        right_arm_shoulder_y: this.prev.right_arm_shoulder_y + this.step*((this.pres.right_arm_shoulder_y-this.prev.right_arm_shoulder_y)/this.dances[this.present_dance].animation_steps),
        right_arm_elbow_x: this.prev.right_arm_elbow_x + this.step*((this.pres.right_arm_elbow_x-this.prev.right_arm_elbow_x)/this.dances[this.present_dance].animation_steps),
        right_arm_elbow_y: this.prev.right_arm_elbow_y + this.step*((this.pres.right_arm_elbow_y-this.prev.right_arm_elbow_y)/this.dances[this.present_dance].animation_steps),
        right_arm_hand_x: this.prev.right_arm_hand_x + this.step*((this.pres.right_arm_hand_x-this.prev.right_arm_hand_x)/this.dances[this.present_dance].animation_steps),
        right_arm_hand_y: this.prev.right_arm_hand_y + this.step*((this.pres.right_arm_hand_y-this.prev.right_arm_hand_y)/this.dances[this.present_dance].animation_steps),
        left_leg_hip_x: this.prev.left_leg_hip_x + this.step*((this.pres.left_leg_hip_x-this.prev.left_leg_hip_x)/this.dances[this.present_dance].animation_steps),
        left_leg_hip_y: this.prev.left_leg_hip_y + this.step*((this.pres.left_leg_hip_y-this.prev.left_leg_hip_y)/this.dances[this.present_dance].animation_steps),
        left_leg_knee_x: this.prev.left_leg_knee_x + this.step*((this.pres.left_leg_knee_x-this.prev.left_leg_knee_x)/this.dances[this.present_dance].animation_steps),
        left_leg_knee_y: this.prev.left_leg_knee_y + this.step*((this.pres.left_leg_knee_y-this.prev.left_leg_knee_y)/this.dances[this.present_dance].animation_steps),
        left_leg_foot_x: this.prev.left_leg_foot_x + this.step*((this.pres.left_leg_foot_x-this.prev.left_leg_foot_x)/this.dances[this.present_dance].animation_steps),
        left_leg_foot_y: this.prev.left_leg_foot_y + this.step*((this.pres.left_leg_foot_y-this.prev.left_leg_foot_y)/this.dances[this.present_dance].animation_steps),
        right_leg_hip_x: this.prev.right_leg_hip_x + this.step*((this.pres.right_leg_hip_x-this.prev.right_leg_hip_x)/this.dances[this.present_dance].animation_steps),
        right_leg_hip_y: this.prev.right_leg_hip_y + this.step*((this.pres.right_leg_hip_y-this.prev.right_leg_hip_y)/this.dances[this.present_dance].animation_steps),
        right_leg_knee_x: this.prev.right_leg_knee_x + this.step*((this.pres.right_leg_knee_x-this.prev.right_leg_knee_x)/this.dances[this.present_dance].animation_steps),
        right_leg_knee_y: this.prev.right_leg_knee_y + this.step*((this.pres.right_leg_knee_y-this.prev.right_leg_knee_y)/this.dances[this.present_dance].animation_steps),
        right_leg_foot_x: this.prev.right_leg_foot_x + this.step*((this.pres.right_leg_foot_x-this.prev.right_leg_foot_x)/this.dances[this.present_dance].animation_steps),
        right_leg_foot_y: this.prev.right_leg_foot_y + this.step*((this.pres.right_leg_foot_y-this.prev.right_leg_foot_y)/this.dances[this.present_dance].animation_steps),
        body_top_x: this.prev.body_top_x + this.step*((this.pres.body_top_x-this.prev.body_top_x)/this.dances[this.present_dance].animation_steps),
        body_top_y: this.prev.body_top_y + this.step*((this.pres.body_top_y-this.prev.body_top_y)/this.dances[this.present_dance].animation_steps),
        body_bottom_x: this.prev.body_bottom_x + this.step*((this.pres.body_bottom_x-this.prev.body_bottom_x)/this.dances[this.present_dance].animation_steps),
        body_bottom_y: this.prev.body_bottom_y + this.step*((this.pres.body_bottom_y-this.prev.body_bottom_y)/this.dances[this.present_dance].animation_steps),
        head_center_x: this.prev.head_center_x + this.step*((this.pres.head_center_x-this.prev.head_center_x)/this.dances[this.present_dance].animation_steps),
        head_center_y: this.prev.head_center_y + this.step*((this.pres.head_center_y-this.prev.head_center_y)/this.dances[this.present_dance].animation_steps),
        eyes: this.prev.eyes,
        smile: this.prev.smile
      };
      this.step++;
      this.show_pose(pose);
    }
    if(this.step == this.dances[this.present_dance].animation_steps) {
      this.isAnimated = false;
      this.step = 0;
    }

  }

  show() {
    let pose = this.dances[this.present_dance].poses[this.present_pose];

    strokeWeight(this.scale/7);
    noFill();
    stroke(255);

    // HANDS
    line(pose.left_arm_shoulder_x*this.scale, pose.left_arm_shoulder_y*this.scale,
         pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale);
    line(pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale,
         pose.left_arm_hand_x*this.scale, pose.left_arm_hand_y*this.scale);
    line(pose.right_arm_shoulder_x*this.scale, pose.right_arm_shoulder_y*this.scale,
         pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale);
    line(pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale,
         pose.right_arm_hand_x*this.scale, pose.right_arm_hand_y*this.scale);

    // LEGS
    line(pose.left_leg_hip_x*this.scale, pose.left_leg_hip_y*this.scale,
         pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale);
    line(pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale,
         pose.left_leg_foot_x*this.scale, pose.left_leg_foot_y*this.scale);
    line(pose.right_leg_hip_x*this.scale, pose.right_leg_hip_y*this.scale,
         pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale);
    line(pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale,
         pose.right_leg_foot_x*this.scale, pose.right_leg_foot_y*this.scale);

    // BODY AND HEAD
    line(pose.body_top_x*this.scale, pose.body_top_y*this.scale,
         pose.body_bottom_x*this.scale, pose.body_bottom_y*this.scale);
    ellipse(pose.head_center_x*this.scale, pose.head_center_y*this.scale,
            this.scale*4, this.scale*4);

    // FACE
    if(pose.smile !== undefined) {
      pose.smile(this.scale, pose.head_center_x, pose.head_center_y);
    } else {
      this.default_smile(this.scale, pose.head_center_x, pose.head_center_y);
    }
    if(pose.eyes !== undefined) {
      pose.eyes(this.scale, pose.head_center_x, pose.head_center_y);
    } else {
      this.default_eyes(this.scale, pose.head_center_x, pose.head_center_y);
    }
  }

  show_pose(pose) {
    strokeWeight(this.scale/7);
    noFill();
    stroke(255);

    // HANDS
    line(pose.left_arm_shoulder_x*this.scale, pose.left_arm_shoulder_y*this.scale,
         pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale);
    line(pose.left_arm_elbow_x*this.scale, pose.left_arm_elbow_y*this.scale,
         pose.left_arm_hand_x*this.scale, pose.left_arm_hand_y*this.scale);
    line(pose.right_arm_shoulder_x*this.scale, pose.right_arm_shoulder_y*this.scale,
         pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale);
    line(pose.right_arm_elbow_x*this.scale, pose.right_arm_elbow_y*this.scale,
         pose.right_arm_hand_x*this.scale, pose.right_arm_hand_y*this.scale);

    // LEGS
    line(pose.left_leg_hip_x*this.scale, pose.left_leg_hip_y*this.scale,
         pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale);
    line(pose.left_leg_knee_x*this.scale, pose.left_leg_knee_y*this.scale,
         pose.left_leg_foot_x*this.scale, pose.left_leg_foot_y*this.scale);
    line(pose.right_leg_hip_x*this.scale, pose.right_leg_hip_y*this.scale,
         pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale);
    line(pose.right_leg_knee_x*this.scale, pose.right_leg_knee_y*this.scale,
         pose.right_leg_foot_x*this.scale, pose.right_leg_foot_y*this.scale);

    // BODY AND HEAD
    line(pose.body_top_x*this.scale, pose.body_top_y*this.scale,
         pose.body_bottom_x*this.scale, pose.body_bottom_y*this.scale);
    ellipse(pose.head_center_x*this.scale, pose.head_center_y*this.scale,
            this.scale*4, this.scale*4);

    // FACE
    if(pose.smile !== undefined) {
      pose.smile(this.scale, pose.head_center_x, pose.head_center_y);
    } else {
      this.default_smile(this.scale, pose.head_center_x, pose.head_center_y);
    }
    if(pose.eyes !== undefined) {
      pose.eyes(this.scale, pose.head_center_x, pose.head_center_y);
    } else {
      this.default_eyes(this.scale, pose.head_center_x, pose.head_center_y);
    }

  }

  default_smile(scale, head_center_x, head_center_y) {
    strokeWeight(scl/13);
    line((head_center_x-0.5)*scl, (head_center_y+0.75)*scl, head_center_x, (head_center_y+1.25)*scl);
    line(head_center_x, (head_center_y+1.25)*scl, (head_center_x+0.5)*scl, (head_center_y+0.75)*scl);
  }

  default_eyes(scale, head_center_x, head_center_y) {
    strokeWeight(scl/6);
    point((head_center_x-0.9)*scl, (head_center_y-0.5)*scl);
    point((head_center_x+0.9)*scl, (head_center_y-0.5)*scl);
  }
}
