// variables
const song = document.querySelector(".song");
const video = document.querySelector("video");
const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();
const play = document.querySelector(".play");
const timeSelect = document.querySelectorAll('.time-select button');
const timeDisplay = document.querySelector(".time-display");
const soundPicker = document.querySelectorAll('.sound-picker button');
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

song.ontimeupdate = (e) => {

  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }

}

timeSelect.forEach(option => {

  option.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${(fakeDuration / 60)}:${(fakeDuration % 60)}`;
  })

})

function checkPlaying(song){
  if(song.paused){
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }
}

play.addEventListener('click', () => {
  checkPlaying(song);
})

soundPicker.forEach( button => {
  button.addEventListener('click', function(){
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  })
});

