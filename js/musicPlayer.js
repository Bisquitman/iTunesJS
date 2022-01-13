import { addZero } from "./functions.js";

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio'),
    audioImg = document.querySelector('.audio-img'),
    audioHeader = document.querySelector('.audio-header'),
    audioPlayer = document.querySelector('.audio-player'),
    audioNavigation = document.querySelector('.audio-navigation'),
    audioButtonPlay = document.querySelector('.audio-button__play'),
    audioProgress = document.querySelector('.audio-progress'),
    audioProgressTiming = document.querySelector('.audio-progress__timing'),
    audioTimePassed = document.querySelector('.audio-time__passed'),
    audioTimeTotal = document.querySelector('.audio-time__total');

  const audioVolume = document.querySelector('.audio-volume');
  const audioMute = document.querySelector('.audio-mute');
  let prevVolume = 1;

  const playlist = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const loadTrack = () => {
    setInterval(updateTime, 0);

    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };
  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };

  audioNavigation.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  const updateTime = () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';
    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  };

  updateTime();

  audioPlayer.addEventListener('timeupdate', updateTime);

  audioProgress.addEventListener('click', e => {
    const x = e.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });


  audioVolume.addEventListener('input', () => {
    audioPlayer.volume = audioVolume.value / 100;
    prevVolume = audioPlayer.volume;
  });

  audioPlayer.volume = 0.5;

  audioVolume.value = audioPlayer.volume * 100;

  audioMute.addEventListener('click', () => {
    if (audioPlayer.volume) {
      prevVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
    } else {
      audioPlayer.volume = prevVolume;
    }
  });

  musicPlayerInit.stop = () => {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.remove('play');
      audioButtonPlay.classList.remove('fa-pause');
      audioButtonPlay.classList.add('fa-play');
    }
  };
};