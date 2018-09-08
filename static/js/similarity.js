// Calcuate L2 norm of the vector
function l2Norm(vec) {
	l2_norm = math.norm(vec);
	len = vec.length;
	l2_vec = new Array(len);
	for(i = 0; i < len; i++) {
		l2_vec[i] = vec[i] / l2_norm;
	}
	return l2_vec;
}

function translation(vec) {
	x0 = (vec[6] - vec[4]) / 2;
	y0 = (vec[13] - vec[5]) / 2;
	trans_vec = [];
	for(i = 0; i < vec.length; i++) {
		if(i % 2 == 1) {
			trans_vec.push(vec[i] - y0);
		} else {
			trans_vec.push(vec[i] - x0);
		}
	}
	return trans_vec;
}
// poseVector1 and poseVector2 are 52-float vectors composed of:
// Values 0-33: are x,y coordinates for 17 body parts in alphabetical order
// Values 34-51: are confidence values for each of the 17 body parts in alphabetical order
// Value 51: A sum of all the confidence values
// Again the lower the number, the closer the distance
var sum = [1, 2, 3].reduce(add, 0);

function add(a, b) {
    return a + b;
}

function weightedDistanceMatching(video_vec, flash_vec, video_score_vec) {
  let vector1PoseXY = l2Norm(translation(video_vec));
  let vector1Confidences = video_score_vec;
  let vector1ConfidenceSum = video_score_vec.reduce(add, 0);
  let vector2PoseXY = l2Norm(translation(flash_vec));
  // console.log("vec");
  // console.log(vector1PoseXY);
  // console.log(vector2PoseXY);
  // console.log(vector1Confidences);
  // console.log("end");

  // First summation
  let summation1 = 1 / vector1ConfidenceSum;

  // Second summation
  let summation2 = 0;
  for (let i = 0; i < vector1PoseXY.length; i++) {
    let tempConf = Math.floor(i / 2);
    let tempSum = Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
	// let tempSum = vector1Confidences[tempConf] * Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
    summation2 = summation2 + tempSum;
  }
  return summation2;
  // return summation1 * summation2;
  // console.log(summation1 * summation2);
  // console.log("end");
}

function get_flash_vec() {
	let fps = 29;
	let dur = koi.currentTime;

	let frame_no = Math.round(fps * dur);
	// console.log("frame no: " + frame_no);
	let flash_vec = [];
	for (id of flash_keypoints_id) {
		if (json_data[frame_no] &&
		json_data[frame_no].hasOwnProperty(id)) {
			flash_vec.push(json_data[frame_no][id][0]);
			flash_vec.push(json_data[frame_no][id][1]);
		} else {
			flash_vec.push(0);
			flash_vec.push(0);
		}
	}
	return flash_vec;
}
