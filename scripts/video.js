const video = document.getElementById("player");
const durationControl = document.getElementById("durationLevel");
const soundControl = document.getElementById("micLevel");
const playButtons = document.querySelectorAll(".play");
const playButtonVideo = document.querySelector(".player__video-img");
const micButton = document.getElementById("mic");

let intervalId;
let soundLevel;
const MAX_SOUND_VALUE = 100;
const NORMAL_UPDATE_RANGE = 1000 / 66;

// документ полностью загружен
document.addEventListener("DOMContentLoaded", function () {
  durationControl.min = 0;
  durationControl.value = 0;
  // задаем максимальные и минимальные значения громокости
  soundControl.min = 0;
  soundControl.max = MAX_SOUND_VALUE;

  //добавляем остальные обработчики
  setEventListeners();
});


function setEventListeners() {
//   video.addEventListener("canplaythrough", (e) => {
//     durationControl.max = video.duration;
//   });

  //обработчики события для запуска видео по кнопкам play
  playButtons.forEach((button) => button.addEventListener("click", playStop));

  // обработчик событий для кнопки динамик
  micButton.addEventListener("click", toggleSoundValue);

  // вешаем обработчик события onclick на тег video
  video.addEventListener("click", playStop);

  // обработчики событий для ползунка продолжительности видео
  durationControl.addEventListener("mousedown", stopInterval);
  durationControl.addEventListener("mouseup", setVideoDuration);

  // обработчики событий для ползунка громокости
  soundControl.addEventListener("mouseup", changeSoundVolume);

  //обрабатываем окончание видео
//   video.addEventListener(
//     "ended",
//     function () {
//       stopInterval();
//       playButtonVideo.classList.toggle("video__player-img--hidden");
//       video.currentTime = 0;
//     },
//     false
//   );
}

/*
 Воспроизведение видео
*/
function playStop() {
  // показывает или скрывает белую кнопку play
  playButtonVideo.classList.toggle("video__player-img--hidden");
  // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
  durationControl.max = video.duration;
  // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
  if (video.paused) {
    // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
    // запускаем видео
    intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE);
    video.play();
  } else {
    // video.webkitExitFullscreen(); //выйти из полноэкранного режима
    // останавливаем видео
    stopInterval();
    video.pause();
  }
}

function stopInterval() {
  if (!video.paused) {
    console.log("Очищаем интервал");
    video.pause();
    clearInterval(intervalId);
  }
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration() {
  console.log("Внутри setVideoDuration");
  intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE);
  video.currentTime = durationControl.value;
  if (video.paused) {
    console.log("Видео стояло на паузе");
    video.play();
    playButtonVideo.classList.add("video__player-img--hidden");
  }
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
  durationControl.value = video.currentTime;
  console.log("Обновляем");
}

/*
    Управление звуком
*/
function toggleSoundValue() {
  /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
        
        Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
        Хранится в перменной soundLevel
        */
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * MAX_SOUND_VALUE;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}

/*
    Управление звуком видео
*/

function changeSoundVolume() {
  /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
         video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
   soundControl.value 0   1   2   3   4   5   6   7   8   9  10
        */
  video.volume = soundControl.value / MAX_SOUND_VALUE;
}
