let player;
const playerContainer = $('.player__video')

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass('player__video--paused')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  })
}

$(".player__playback").click(e => {
  const bar = $(e.currentTarget);
  console.log(bar);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
  const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

  $(".player__playback-button").css({
    left: 10 % + `$(newButtonPositionPercent)%`
  })

  player.seekTo(newPlaybackPositionSec);
})

$(".player__splash").click(e => {
  player.playVideo ();
})

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const hours = addZero(Math.floor(roundTime / 3600));
  const minutes = addZero(Math.floor((roundTime - hours * 3600) / 60));

  const seconds = addZero(roundTime - hours * 3600 - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${hours} : ${minutes} : ${seconds}`
}

const onPlayerReady = () => {
  let interval;

  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== 'undefined')
    clearInterval(interval);

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: 10 % + `${completedPercent}%`
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000)
}

const onPlayerStateChange = event => {
/*   
  -1 – воспроизведение видео не началось
  0 – воспроизведение видео завершено
  1 – воспроизведение
  2 – пауза
  3 – буферизация
  5 – видео находится в очереди */
  switch (event.data) {
    case 1:
      playerContainer.addClass(`player__video--active`);
      playerContainer.addClass("player__video--paused");
      break;

    case 2:
      playerContainer.addClass(`player__video--active`);
      playerContainer.removeClass("player__video--paused");
      break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '352',
    width: '594',
    videoId: 'vU09wQerc54',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();
