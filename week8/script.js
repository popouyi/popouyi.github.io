const videoList = [
  { id: 1, src: "stardust-1.mp4" },
  { id: 2, src: "zenscape-1.mp4" },
  {
    id: 3,
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
  },
];

// --------------------------------------------------------------------
// First course of action: get access to the video
const myVideo = document.querySelector("#my-video");
console.log(myVideo);
// --------------------------------------------------------------------

// ----------------------------------------------------
// play pause logic
// 1. get access to the button

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

// 2. listen to clicks on that button

playPauseButton.addEventListener("click", toggleVideo);
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// 3. write callback function that needs to play/pause the video

function toggleVideo() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// ----------------------------------------------------
// ----------------------------------------------------
// mute unmute logic
// 1. get access to the button
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);
// 2. listen to clicks on that button
muteUnmuteButton.addEventListener("click", toggleAudio);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);
// 3. write callback function that needs to mute/unmute the video

function toggleAudio() {
  if (myVideo.muted) {
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/mute--v1.png";
    myVideo.muted = false;
  } else {
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v.png";
    myVideo.muted = true;
  }
}

// ----------------------------------------------------
// fast forward logic
const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);
fastForwardButton.addEventListener("click", fastForwardVideo);
function fastForwardVideo() {
  myVideo.currentTime = myVideo.currentTime + 5;
}
// ----------------------------------------------------
// stepping logic
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);
// listen to clicks on that button

step1Button.addEventListener("click", gotoStep1);
function gotoStep1() {
  myVideo.currentTime = 16.0;
}
step2Button.addEventListener("click", gotoStep2);
function gotoStep2() {
  myVideo.currentTime = 43.0;
}
// ----------------------------------------------------
// likes logic
// 1. get access to the button
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);
// 1.2 get access to the text area and i should also create a counter
let likes = 0;
const likesText = document.querySelector("#likes");
console.log(likesText);
// 2. listen to clicks on that button
heartButton.addEventListener("click", displayLikes);
// 3. write callback function that needs to update the counter and display it
function displayLikes() {
  likes++;
  likesText.textContent = likes;
}

// ----------------------------------------------------
// progress bar logic
// 1. get access to the progress bar
const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);
// 2. listen to the video time update event
myVideo.addEventListener("timeupdate", updateProgress);
// 3. write callback function that needs to update the progress bar value
function updateProgress() {
  let duration = (myVideo.currentTime / myVideo.duration) * 100;
  // console.log(duration);
  progressBar.style.width = duration + "%";
}
// ----------------------------------------------------
// fullscreen logic
// 1. get access to the button
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

// 2. listen to clicks on that button
fullscreenButton.addEventListener("click", goFullScreen);
myVideo.addEventListener("dblclick", goFullScreen);

// 3. write callback function that needs to make the video fullscreen
function goFullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ----------------------------------------------------
// playlist logic
// 1. get access to the button
const stardustButton = document.querySelector("#stardust-vid-button");
console.log(stardustButton);
const zenscapeButton = document.querySelector("#zenscape-vid-button");
console.log(zenscapeButton);
const miacButton = document.querySelector("#musicvideo-vid-button");
console.log(miacButton);
// 2. listen to clicks on that button
stardustButton.addEventListener("click", function () {
  chooseVideo(0);
});
zenscapeButton.addEventListener("click", function () {
  chooseVideo(1);
});
miacButton.addEventListener("click", function () {
  chooseVideo(2);
});
// 3. write callback function that needs to change the video source and play the video
function chooseVideo(no) {
  let currentVideo = videoList[no].src;
  console.log(currentVideo);
  myVideo.src = currentVideo;
  myVideo.play();
  myVideo.load();
}
