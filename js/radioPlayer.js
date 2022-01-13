export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');
  const radioMute = document.querySelector('.radio-mute');

  let prevVolume = 1;

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  const changePlayIcon = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  const selectItem = (elem) => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  radioNavigation.addEventListener('change', (event) => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    const title = parent.querySelector('.radio-name').textContent;
    const urlImg = parent.querySelector('.radio-img').src;

    selectItem(parent);
    radioHeaderBig.textContent = title;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStation;
    audio.play();
    changePlayIcon();
  });

  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changePlayIcon();
  });

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
    prevVolume = audio.volume;
  });

  audio.volume = 0.5;

  radioVolume.value = audio.volume * 100;

  radioMute.addEventListener('click', () => {
    if (audio.volume) {
      prevVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = prevVolume;
    }
  });

  radioPlayerInit.stop = () => {
    audio.pause;
    changePlayIcon();
  };
};