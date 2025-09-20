// First, I compiled all the DOM elements that are needed for the project.
// I decided to do this to ensure that all the elements are correctly linked and to keep the code more clean and organised
// -----DOM Element Selection------------------------------------------
const video = document.querySelector("#myVideo");
console.log(video);
const playPauseButton = document.querySelector("#playPause");
console.log(playPauseButton);
const stopButton = document.querySelector("#stop");
console.log(stopButton);
const rewindButton = document.querySelector("#rewind");
console.log(rewindButton);
const forwardButton = document.querySelector("#forward");
console.log(forwardButton);
const muteButton = document.querySelector("#mute");
console.log(muteButton);
const fullscreenButton = document.querySelector("#fullscreen");
console.log(fullscreenButton);
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);
// ---------------------------------------------------------------------

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

// Rewind 10s
rewindButton.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

// Forward 10s
forwardButton.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Toggle mute
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

// Fullscreen
fullscreenButton.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});
