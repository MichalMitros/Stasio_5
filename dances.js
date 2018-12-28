
function createDances() {
  let dances = [];

  // CLASSIC DANCE
  dances.push({
    poses: [],
    isAnimated: true,
  });
  dances[0].poses.push({
    left_arm_shoulder_x: 0,
    left_arm_shoulder_y: -1,
    left_arm_elbow_x: -2.5,
    left_arm_elbow_y: -1,
    left_arm_hand_x: -2.5,
    left_arm_hand_y: 1,
    right_arm_shoulder_x: 0,
    right_arm_shoulder_y: -1,
    right_arm_elbow_x: 2.5,
    right_arm_elbow_y: -1,
    right_arm_hand_x: 2.5,
    right_arm_hand_y: -3,
    left_leg_hip_x: 0,
    left_leg_hip_y: 4,
    left_leg_knee_x: -1.5,
    left_leg_knee_y: 7,
    left_leg_foot_x: -1.5,
    left_leg_foot_y: 7,
    right_leg_hip_x: 0,
    right_leg_hip_y: 4,
    right_leg_knee_x: 1.5,
    right_leg_knee_y: 7,
    right_leg_foot_x: 1.5,
    right_leg_foot_y: 7,
    body_top_x: 0,
    body_top_y: -3,
    body_bottom_x: 0,
    body_bottom_y: 4,
    head_center_x: 0,
    head_center_y: -5,
    eyes: function(scl) {
      strokeWeight(scl/6);
      point(-0.9*scl, -5.5*scl);
      point(0.9*scl, -5.5*scl);
    },
    smile: function(scl) {
      strokeWeight(scl/13);
      line(-0.5*scl, -4.25*scl, 0*scl, -3.75*scl);
      line(0*scl, -3.75*scl, 0.5*scl, -4.25*scl);
    }
  });
  dances[0].poses.push({
    left_arm_shoulder_x: 0,
    left_arm_shoulder_y: -1,
    left_arm_elbow_x: -2.5,
    left_arm_elbow_y: -1,
    left_arm_hand_x: -2.5,
    left_arm_hand_y: -3,
    right_arm_shoulder_x: 0,
    right_arm_shoulder_y: -1,
    right_arm_elbow_x: 2.5,
    right_arm_elbow_y: -1,
    right_arm_hand_x: 2.5,
    right_arm_hand_y: 1,
    left_leg_hip_x: 0,
    left_leg_hip_y: 4,
    left_leg_knee_x: -1.5,
    left_leg_knee_y: 7,
    left_leg_foot_x: -1.5,
    left_leg_foot_y: 7,
    right_leg_hip_x: 0,
    right_leg_hip_y: 4,
    right_leg_knee_x: 1.5,
    right_leg_knee_y: 7,
    right_leg_foot_x: 1.5,
    right_leg_foot_y: 7,
    body_top_x: 0,
    body_top_y: -3,
    body_bottom_x: 0,
    body_bottom_y: 4,
    head_center_x: 0,
    head_center_y: -5,
    eyes: function(scl) {
      strokeWeight(scl/6);
      point(-0.9*scl, -5.5*scl);
      point(0.9*scl, -5.5*scl);
    },
    smile: function(scl) {
      strokeWeight(scl/13);
      line(-0.5*scl, -4.25*scl, 0*scl, -3.75*scl);
      line(0*scl, -3.75*scl, 0.5*scl, -4.25*scl);
    }
  });

  return dances;
}
