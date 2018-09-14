# ShallWeDance


**Shall We Dance** is a dancing teaching web application. Users can learn to dance following the teaching video, and the dancing action of the user will be scored based on the similarity of poses between the user and the teaching video . After finishing the dancing learning process, users can get a generated video which shows what will look like when the user can perform the whole dance.

Sustainable development goals: automated education and keep people healthy.

<div align=center>

<img src="static/img/esmeralda.png" >

</div>

## Requirements

* Python 3.6
* Tornado 5.x
* A PC with camera
## Installation

```
git clone git@github.com:mercari-cn-hackathon/JaneTakanashi.git
cd JaneTakanashi
python server.py --port=8888
```

open browser and visit `localhost:8888` and the demo will be shown.

## Usage

### Dance teaching

#### 1. Tips

Keeping all your body (head, wrists and ankles, etc.) captured by the camera will increase the precision of the keypoints detection.

#### 2. Play/Pause the video

You can **press the play button** or **raise your right hand** for playing the video.

You can **press the pause button** or **raise your left hand** for pausing the video.

#### 3. Scores

The similarity of the pose of you and the video will be calculated every second. More similar poses achieve higher scores.

As the figures show, the pose in the first fig is more similar with the pose in the teaching video, whose error(matching distance) is around 0.407, which is smaller than the 0.585.

<div align=center>

<img src="static/img/Snip20180909_8.png" width="600px">



<img src="static/img/Snip20180909_9.png" width="600px">

</div>

#### 4. Technology details

All the keypoints below are used. [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose), a library for real-time multi-person keypoint detection and multi-threading written in C++ using OpenCV and Caffe is used for keypoints detection in this app.

[tensorflow.js](https://github.com/tensorflow/tfjs) is applied for real-time detection and it can run on web. The keypoints of dancing teaching video was tagged offline by [OpenPose Pytorch Version](https://github.com/tensorboy/pytorch_Realtime_Multi-Person_Pose_Estimation), which is more accurate but needs more time.

| Id   | Part          |
| ---- | ------------- |
| 0    | nose          |
| 1    | leftEye       |
| 2    | rightEye      |
| 3    | leftEar       |
| 4    | rightEar      |
| 5    | leftShoulder  |
| 6    | rightShoulder |
| 7    | leftElbow     |
| 8    | rightElbow    |
| 9    | leftWrist     |
| 10   | rightWrist    |
| 11   | leftHip       |
| 12   | rightHip      |
| 13   | leftKnee      |
| 14   | rightKnee     |
| 15   | leftAnkle     |
| 16   | rightAnkle    |

### Automated generated video

Click the "MODAL" button and you will see the generated video. It shows what it looks like when you can perform this dance. (It need time training so I put my own trained model here :) This was achieved by [CycleGAN](https://github.com/junyanz/CycleGAN).

The function was came out by the idea that if one can watch the video which shows what it looks like when he can hold this dance, he will be inspired to keep on learning. 

<div align=center>

![combine](static/gif/combine.gif)

</div>

### Functions need improving next step

* improving the detection accuracy
* improving the similarity accuracy
* improving the GAN accuracy
* achieve the recommendation function
  * I want to recommend some goods to users, meanwhile he watch the generated video. And the recommend things are related to this dance.
* dancing pose suggestions
  * After the user learnt the dance, some suggestions can be proposed such as "keep your arms extended" or "Keeping your back straight".