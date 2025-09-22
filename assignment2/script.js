// First, I compiled all the DOM elements that are needed for the project.
// I decided to do this to ensure that all the elements are correctly linked and to keep the code more clean and organised
// -----DOM Element Selection------------------------------------------
const video = document.querySelector("#myVideo");
console.log(video);
const playPauseButton = document.querySelector("#playPause");
console.log(playPauseButton);
const rewindButton = document.querySelector("#rewind");
console.log(rewindButton);
const forwardButton = document.querySelector("#forward");
console.log(forwardButton);
const muteButton = document.querySelector("#mute");
console.log(muteButton);
const fullscreenButton = document.querySelector("#fullscreen");
const replayButton = document.querySelector("#replay-img");
console.log(replayButton);
console.log(fullscreenButton);
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);
const progressBarFill = document.querySelector("#progress-bar-fill");
console.log(progressBarFill);
const loopButton = document.querySelector("#loop-img");
console.log(loopButton);

// ---------------------------------------------------------------------

// -----Main Functionality---------------------------------------------------------

// Toggle play/pause
playPauseButton.addEventListener("click", toggleVideo);
function toggleVideo() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// Forward ( I added a double click event to forward 10 seconds
// and a single click event to forward 5 seconds, to give more control to the user)
forwardButton.addEventListener("click", forwardVideo5);
forwardButton.addEventListener("dblclick", forwardVideo);
function forwardVideo() {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
}
function forwardVideo5() {
  video.currentTime = Math.min(video.duration, video.currentTime + 5);
}

// Rewind ( I also added the same thing as the forward button )
rewindButton.addEventListener("click", rewindVideo5);
rewindButton.addEventListener("dblclick", rewindVideo);
function rewindVideo() {
  video.currentTime = Math.max(0, video.currentTime - 10);
}
function rewindVideo5() {
  video.currentTime = Math.max(0, video.currentTime - 5);
}

// Mute/Unmute ( I followed the same logic as the one we learned in class on week 8)
muteButton.addEventListener("click", toggleAudio);
function toggleAudio() {
  if (video.muted) {
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v.png";
    video.muted = false;
  } else {
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/mute--v1.png";
    video.muted = true;
  }
}

// Fullscreen ( same goes for the fullscreen logic)
fullscreenButton.addEventListener("click", goFullScreen);
myVideo.addEventListener("dblclick", goFullScreen);
function goFullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// progress bar update
video.addEventListener("timeupdate", updateProgressBar);
function updateProgressBar() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBarFill.style.width = percentage + "%";
}

// Replay
replayButton.addEventListener("click", replayVideo);
function replayVideo() {
  video.currentTime = 0;
  video.play();
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
}

// Loop video ( For the additional feature, i decided to add a loop button that allows the user to loop the video)
// For the loop logic, I followed the same logic as the mute/unmute and play/pause button
loopButton.addEventListener("click", toggleLoop);
function toggleLoop() {
  if (video.loop) {
    video.loop = false;
    loopButton.src = "https://img.icons8.com/ios-glyphs/30/repeat.png";
  } else {
    video.loop = true;
    loopButton.src = "https://img.icons8.com/ios-glyphs/30/repeat.png";
  }
}

// -----------------------------------------------------------------------------
