/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
import { Player } from 'bitmovin-player';
// import { UIFactory, UIManager } from 'bitmovin-player-ui';
import {
  PlaybackToggleOverlay,
  FullscreenToggleButton,
  PlaybackTimeLabel,
  SeekBar,
  UIContainer,
  UIManager,
  UIFactory
} from 'bitmovin-player-ui';

import noUiSlider from 'nouislider';
import './lib/rangeslider';
import './lib/jquery.mousewheel.min';
import {
  getUrlImageStatic,
  getCookie,
  cookieValuesToObject,
  setCookie,
  isEmpty
} from './lib/global';

const config = {
  key: '37bf7581-f96e-4c92-9f9b-31297e8a9507',
  ui: false
};

const source = {
  title: 'Art of Motion',
  description: 'What is this event... Parcour?',
  dash: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
  hls: 'https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  poster: 'https://bitmovin-a.akamaihd.net/content/sintel/poster.png'
};

const container = document.getElementById('my-player');
global.player = new Player(container, config);

// const myUiManager = UIFactory.buildDefaultUI(player);

// Definition of the UI structure
// const mySimpleUi = new UIContainer({
//   components: [
//     new PlaybackToggleOverlay(),
//     new FullscreenToggleButton(),
//     new SeekBar(),
//     new PlaybackTimeLabel()
//   ]
// });
// const myUiManager = new UIManager(player, mySimpleUi);
const myUiManager = UIFactory.buildDefaultSmallScreenUI(global.player);

const setVolume = val => {
  const player = document.getElementById('bitmovinplayer-video-my-player');
  player.volume = val;
  const element = $('.icon-volume > i');
  if (player.volume === 0) {
    element.removeClass('icon-sound').addClass('icon-mute');
  } else {
    element.removeClass('icon-mute').addClass('icon-sound');
  }
};

function toggleNextEpisode() {
  $('.player-next-episode')
    .removeClass('out')
    .addClass('active');

  // after animation finish 1s
  setTimeout(() => {
    global.bLazy.revalidate();
  }, 1000);

  let times = 10;
  const interval = setInterval(() => {
    if (times === 1) {
      $('.player-next-episode').addClass('out');

      setTimeout(() => {
        $('.player-next-episode').removeClass('active');
      }, 1000);
      clearInterval(interval);
    }
    $('.episode-countdown .number').text(times);
    times--;
  }, 1000);
}

function closeNextEpisode() {
  $('.player-next-episode').addClass('out');
  setTimeout(() => {
    $('.player-next-episode').removeClass('active');
  }, 1000);
}

function moveCustomControls() {
  const player = $('#my-player');
  const lastElement = player.children();
  if (!lastElement.last().is('#custom-controls')) {
    player.append($('#custom-controls').remove());
  }
}

global.player.load(source).then(
  () => {
    if ($('.custom-player').length > 0) {
      // $('#customControls')
      //   .tmpl()
      //   .appendTo($('#my-player'));
      $('#customControls')
        .tmpl()
        .appendTo($('#custom-controls'));
    }

    $('#customNextEpisode')
      .tmpl({
        title: 'Episode 2',
        image: 'https://via.placeholder.com/180x105',
        description:
          // eslint-disable-next-line quotes
          "A young Rhys is shot dead in the house. Rewind 15 days and we meet four siblings and their families as they arrive at an isolated farmhouse to scatter their mother's ashes. Lorem ipsum in doors with more text and add dots in last line"
      })
      .appendTo($('.player-fullscreen'));

    $(document).on('click', '.player-fullscreen .close-next-episode', event => {
      event.preventDefault();
      closeNextEpisode();
    });
    $(document).on('click', '.player-fullscreen .actions > a', event => {
      event.preventDefault();
      closeNextEpisode();
    });

    // setTimeout(() => {
    //   toggleNextEpisode();
    // }, 3000);

    // setTimeout(() => {
    //   toggleNextEpisode();
    // }, 15000);

    // $('#customEpisodeButtons')
    //   .tmpl()
    //   .appendTo($('#my-player'));
    $('#customEpisodeButtons')
      .tmpl()
      .appendTo($('#custom-controls'));

    // $('#customSplash')
    //   .tmpl({
    //     title: source.title,
    //     description: source.description
    //   })
    //   .appendTo($('.player-fullscreen'));

    const slide = document.getElementById('vol-control');

    noUiSlider.create(document.getElementById('vol-control'), {
      start: 100,
      step: 1,
      connect: [true, false],
      direction: 'rtl',
      orientation: 'vertical',
      range: {
        min: 0,
        max: 100
      }
    });

    slide.noUiSlider.on('change', value => {
      setVolume(value / 100);
    });

    $('.volume .input').on('mousewheel', e => {
      if (e.originalEvent.wheelDelta / 120 > 0) {
        parseInt(slide.noUiSlider.get(), 10) <= 95
          ? slide.noUiSlider.set(parseInt(slide.noUiSlider.get(), 10) + 2)
          : slide.noUiSlider.set(100);
      } else {
        parseInt(slide.noUiSlider.get(), 10) >= 5
          ? slide.noUiSlider.set(parseInt(slide.noUiSlider.get(), 10) - 2)
          : slide.noUiSlider.set(0);
      }
      setVolume(slide.noUiSlider.get() / 100);

      return false;
    });

    // $('#my-player').append(
    //   $('.close-modal')
    //     .removeClass('hide')
    //     .remove()
    // );

    global.player.on('play', () => {
      moveCustomControls();
    });

    // global.player.on('playerresized', () => {
    //   console.log(true);
    // });

    setTimeout(() => {
      $('.animation.load-more').addClass('out');
      $('#my-player').append($('#custom-controls').remove());
    }, 1000);
  },
  reason => {
    console.log('Error while creating Bitmovin Player instance');
  }
);

global.volume = 1;

$(document).on('click', '.icon-volume', () => {
  const player = document.getElementById('bitmovinplayer-video-my-player');

  if (player.volume > 0) {
    global.volume = player.volume;
    setVolume(0);
    document.getElementById('vol-control').noUiSlider.set(0);
  } else {
    setVolume(global.volume);
    document.getElementById('vol-control').noUiSlider.set(global.volume * 100);
  }
});

function setFontSizeSubtitules(size) {
  $('.custom-player .bitmovinplayer-container .bmpui-ui-subtitle-label').addClass(size);
}
function setActiveSubtitules(activated) {
  $('.custom-player .bitmovinplayer-container .bmpui-ui-subtitle-label').addClass(
    activated ? 'activated' : 'desactivated'
  );
}

$(document).on('click', '.subtitles-button ul li', e => {
  const ul = $(e.currentTarget).parent();
  $(e.currentTarget)
    .siblings()
    .removeClass('active');

  $(e.currentTarget).addClass('active');

  const bitmovinPlayerCookie = cookieValuesToObject(getCookie('bitmovinPlayerCookie'));

  if (ul.hasClass('font-size')) {
    const value = $(e.currentTarget).attr('data-value');
    bitmovinPlayerCookie.fontSize = value;
  } else {
    const value = $(e.currentTarget).attr('data-value');
    bitmovinPlayerCookie.activated = value === 'activated';
  }

  $('.custom-player .bitmovinplayer-container .bmpui-ui-subtitle-label').removeAttr('class');

  setFontSizeSubtitules(bitmovinPlayerCookie.fontSize);
  setActiveSubtitules(bitmovinPlayerCookie.activated);

  setCookie(
    'bitmovinPlayerCookie',
    `fontSize=${bitmovinPlayerCookie.fontSize}&activated=${bitmovinPlayerCookie.activated}`,
    7
  );

  console.log(cookieValuesToObject(getCookie('bitmovinPlayerCookie')));
});

$(() => {
  const bitmovinPlayerCookie = cookieValuesToObject(getCookie('bitmovinPlayerCookie'));
  if (isEmpty(bitmovinPlayerCookie)) {
    setCookie('bitmovinPlayerCookie', 'fontSize=regular&activated=true', 7);
  }

  window.addEventListener('orientationchange', event => {
    moveCustomControls();
  });
});
