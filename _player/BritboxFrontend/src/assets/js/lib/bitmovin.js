/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
import { Player, PlayerEvent } from 'bitmovin-player/modules/bitmovinplayer-core';
import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill';
import EngineBitmovinModule from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import XmlModule from 'bitmovin-player/modules/bitmovinplayer-xml';
import PatchModule from 'bitmovin-player/modules/bitmovinplayer-patch';
import RemoteControlModule from 'bitmovin-player/modules/bitmovinplayer-remotecontrol';
import MseRendererModule from 'bitmovin-player/modules/bitmovinplayer-mserenderer';
import EngineNativeModule from 'bitmovin-player/modules/bitmovinplayer-engine-native';
import AbrModule from 'bitmovin-player/modules/bitmovinplayer-abr';
import HlsModule from 'bitmovin-player/modules/bitmovinplayer-hls';
import DashModule from 'bitmovin-player/modules/bitmovinplayer-dash';
import ContainerTSModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import ContainerMp4Module from 'bitmovin-player/modules/bitmovinplayer-container-mp4';
import SubtitlesModule from 'bitmovin-player/modules/bitmovinplayer-subtitles';
import SubtitlesTtmlModule from 'bitmovin-player/modules/bitmovinplayer-subtitles-ttml';
import SubtitlesVttModule from 'bitmovin-player/modules/bitmovinplayer-subtitles-vtt';
import SubtitlesNativeModule from 'bitmovin-player/modules/bitmovinplayer-subtitles-native';
import StyleModule from 'bitmovin-player/modules/bitmovinplayer-style';
import ThumbnailModule from 'bitmovin-player/modules/bitmovinplayer-thumbnail';
import { PlayerModule as AnalyticsModule } from 'bitmovin-analytics';

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
import './rangeslider';
import './jquery.mousewheel.min';
import constants from './constants';
import {
  setCookieAuthKey,
  getUrlImageStatic,
  getCookie,
  calculateSizeImage,
  cookieValuesToObject,
  setCookie,
  isEmpty
} from './global';
import { BritboxAccountApi, BritboxContentApi, refreshToken } from './sdk';

Player.addModule(PolyfillModule);
Player.addModule(EngineBitmovinModule);
Player.addModule(XmlModule);
Player.addModule(PatchModule);
Player.addModule(RemoteControlModule);
Player.addModule(MseRendererModule);
Player.addModule(EngineNativeModule);
Player.addModule(AbrModule);
Player.addModule(HlsModule);
Player.addModule(DashModule);
Player.addModule(ContainerTSModule);
Player.addModule(ContainerMp4Module);
Player.addModule(SubtitlesModule);
Player.addModule(SubtitlesTtmlModule);
Player.addModule(SubtitlesVttModule);
Player.addModule(SubtitlesNativeModule);
Player.addModule(StyleModule);
Player.addModule(ThumbnailModule);
Player.addModule(AnalyticsModule);

const sha1 = require('sha1');

const profileApiInstance = new BritboxAccountApi.ProfileApi();
const mediaApiInstance = new BritboxAccountApi.MediaApi();
const contentApiInstance = new BritboxContentApi.ItemsApi();

const localStorageSubtitleKey = 'tkf_sub_id';
const localStorageSubtitleSize = 'tkf_sub_fs';
const localStorageVolumneValue = 'tkf_vol_val';

const castNamespace = 'urn:x-cast:com.bitmovin.player.cast2';

global.watchedInfo = null;
global.itemInfo = null;
global.itemVideoCustomId = null;
global.itemVideoStartingPosition = 0;

global.pushedPlay90 = false;
global.pushedPlay10 = false;

global.continueAnimation = null;
global.volume = 0.75;
global.volumePrevMuted = 1;

global.isTrailerContent = false;

global.JS_callbacks0 = function(callbackData) {
  window.dispatchEvent(new CustomEvent('callbackReady', { detail: callbackData }));
};

global.scaleSubtitles = function(pixels) {
  const subtitleOverlayList = document.getElementsByClassName('bmpui-ui-subtitle-overlay');

  if (subtitleOverlayList.length > 0) {
    switch (pixels) {
      case 50:
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-75');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-100');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-150');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-200');
        subtitleOverlayList[0].classList.add('bmpui-fontsize-50');
        break;
      case 75:
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-50');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-100');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-150');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-200');
        subtitleOverlayList[0].classList.add('bmpui-fontsize-75');
        break;
      case 100:
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-50');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-75');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-150');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-200');
        subtitleOverlayList[0].classList.add('bmpui-fontsize-100');
        break;
      case 150:
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-50');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-75');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-100');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-200');
        subtitleOverlayList[0].classList.add('bmpui-fontsize-150');
        break;
      case 200:
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-50');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-75');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-100');
        subtitleOverlayList[0].classList.remove('bmpui-fontsize-150');
        subtitleOverlayList[0].classList.add('bmpui-fontsize-200');
        break;
      default:
        break;
    }
  }

  if (global.player.isCasting()) {
    const castSession = global.cast.framework.CastContext.getInstance().getCurrentSession();
    castSession.sendMessage(castNamespace, { customAction: 'subtitlesScale', value: pixels });
  }
};

global.subtitlesOff = function(value) {
  const subtitleOverlayList = document.getElementsByClassName('bmpui-ui-subtitle-overlay');
  if (!value) {
    global.player.subtitles.enable('sub1');
  } else {
    global.player.subtitles.disable('sub1');
  }
};

function calculatePercentage(oldFigure, newFigure) {
  const percentChange = ((oldFigure - newFigure) / oldFigure) * 100;
  return Math.round(Math.abs(percentChange));
}

function CloseVideo() {
  $('body').removeClass('overflow');
  $('.modal-overlay, .modal').removeClass('active move playing splash');
  $('.modal .load-more').removeClass('out');
  $('#custom-controls').empty();
  $('.player-next-episode').remove();
  $('.close-modal').removeClass('hide');

  // Try to unload, remove, destroy all related to video player
  clearInterval(global.watchingInterval);
  clearInterval(global.putWatchingInterval);
  clearInterval(global.nextEpisdeCountDown);

  // Player Destroy
  if (global.player) {
    // console.log('PUSH DATALAYER @Stop');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'stop',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });

    global.player.unload().then(() => {
      global.player.destroy().then(() => {
        // console.log('Player Destroyed on close video');
        global.player = null;

        $('#my-player .bmpui-ui-uicontainer').remove();
        // console.log('Value of player on close', global.player);
      });
    });
  }

  // $('#my-player')
  //  .find('*')
  //  .not('.close-modal')
  //  .not('.icon-cross')
  //  .remove();

  $('.animation.load-more').removeClass('hide');
  $('.error-message.load-more').addClass('hide');

  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

  if (global.heroSlider) {
    global.heroSlider.autoplay.run();
  }
}
function DisplayPlayerError() {
  clearInterval(global.watchingInterval);
  clearInterval(global.putWatchingInterval);
  clearInterval(global.nextEpisdeCountDown);

  $('.close-modal').removeClass('hide');
  $(document).on('click', '.close-modal', event => {
    CloseVideo();
  });

  $(document).on('click', '.close-player-error-text', event => {
    CloseVideo();
  });

  // Player Destroy
  if (global.player) {
    global.player.unload().then(() => {
      // console.log('Player Unloaded on error');

      global.player.destroy().then(() => {
        // console.log('Player Destroyed on error');
        global.player = null;
      });
    });
  }

  global.NextVideoInfo = null;

  $('.animation.load-more').addClass('hide');
  $('.error-message.load-more').removeClass('hide');
}

global.videoTokenRefresh = 0;
const refreshUserToken = () =>
  new Promise((resolve, reject) => {
    if (global.videoTokenRefresh === 0) {
      global.videoTokenRefresh = 1;

      // Refresh Token Call
      const refreshData = { value: '', isD3: false };
      $.post(global.libs.Constants.account, refreshData, data => {
        if (data.ResponseCode !== '0') {
          // REFRESH TOKEN SUCCESS

          if (data !== '') {
            // If refresh success restart retry count
            global.videoTokenRefresh = 0;

            // Update authKey with new Authentication Token Value
            const { AuthKey, ExpiresIn } = data;

            setCookieAuthKey('authkey', AuthKey, ExpiresIn);

            refreshToken();
            resolve();
          } else {
            // Delete UserStatus Cookie
            setCookie('SessionStatus', '', -1);
            // Delete RefreshToken Cookie
            setCookie('ert', '', -1);

            reject();
          }
        } else {
          // Delete UserStatus Cookie
          setCookie('SessionStatus', '', -1);
          // Delete RefreshToken Cookie
          setCookie('ert', '', -1);

          reject();
        }
      });
    } else {
      reject();
    }
  });

const getWatching = itemId =>
  new Promise((resolve, reject) => {
    const usertToken = getCookie('authkey');

    const callback = function(error, data, response) {
      if (error) {
        DisplayPlayerError();
        reject(data);
      } else {
        resolve(response.body);
      }
    };

    profileApiInstance.getItemWatchedStatus(itemId, callback);
  });

const putWatching = (itemId, seconds) =>
  new Promise((resolve, reject) => {
    const opts = {
      segments: [global.Country],
      request: { position: seconds }
    };

    profileApiInstance.setItemWatchedStatus(itemId, opts, (error, data, response) => {
      if (error) {
        if (response.statusCode === 401 || response.statusCode === 500) {
          // TRY REFRESH TOKEN
          refreshUserToken()
            .then(() => {
              resolve();
            })
            .catch(reason => {
              reject(reason);
            });
        } else {
          reject(data);
        }
      } else {
        const { firstWatchedDate } = global.watchedInfo;

        if (typeof firstWatchedDate === 'undefined') {
          global.watchedInfo.firstWatchedDate = new Date().toISOString();
        }
        if (global.bodyVm) {
          global.bodyVm.$store.commit('setUserDataWatched', {
            itemId,
            watchedInfo: global.watchedInfo,
            itemInfo: global.itemInfo,
            seconds,
            lastWatchedDate: new Date().toISOString()
          });
        }

        resolve(response.body);
      }
    });
  });

const getNextWatching = itemId =>
  new Promise((resolve, reject) => {
    const opts = {
      device: 'web_browser',
      sub: 'Subscriber',
      segments: [global.Country]
    };

    const callback = function(error, data, response) {
      if (error) {
        DisplayPlayerError();
        reject(data);
      } else {
        resolve(response.body);
      }
    };

    profileApiInstance.getNextPlaybackItem(itemId, opts, callback);
  });

const getItemMediaSelectorToken = (itemId, resolution, delivery, device, sub, token) =>
  new Promise((resolve, reject) => {
    const opts = {
      delivery: [delivery],
      resolution,
      device,
      sub,
      segments: [global.Country],
      pcToken: token
    };

    const callback = function(error, data, response) {
      if (error) {
        DisplayPlayerError();
        reject(data);
      } else {
        resolve(response.body);
      }
    };

    mediaApiInstance.getItemMediaFiles(itemId, opts, callback);
  });

const getItemMediaSelector = (
  videoId,
  customId,
  videoToken,
  pcToken,
  isTrailer = false,
  retryCount = 0
) =>
  new Promise((resolve, reject) => {
    if (retryCount > 2) {
      reject(new Error('getItemMediaSelector fail'));
    } else {
      const mediaSelectorScriptTag = document.createElement('script');

      window.addEventListener(
        'callbackReady',
        customEvent => {
          const mediaSelectorContainer = document.getElementById('mediaSelectorContainer');

          if (mediaSelectorContainer !== null) {
            mediaSelectorContainer.parentNode.removeChild(mediaSelectorContainer);
          }

          resolve(customEvent.detail);
        },
        true
      );

      let platform = 'pc';
      const innerWidth = window.innerWidth;

      if (innerWidth <= 640) platform = 'mobile-phone-main';
      else if (innerWidth <= 1024) platform = 'mobile-tablet-main';

      let videoTokenParameter = '';
      if (!isTrailer) {
        videoTokenParameter = `?saml_auth=${videoToken}`;
      }

      const idToHash = `7dff7671d0c697fedb1d905d9a121719938b92bf${customId}`;
      const mediaSelectorScriptUrl = `${
        constants[constants.environment].mediaSelectorHost
      }/mediaselector/6/select/version/2.0/mediaset/${platform}/vpid/${customId}/format/json/atk/${sha1(
        idToHash
      )}/asn/1/jsfunc/JS_callbacks0${videoTokenParameter}`;
      mediaSelectorScriptTag.setAttribute('id', 'mediaSelectorContainer');
      mediaSelectorScriptTag.setAttribute('src', mediaSelectorScriptUrl);
      mediaSelectorScriptTag.onerror = function() {
        mediaSelectorScriptTag.parentNode.removeChild(mediaSelectorScriptTag);

        getItemMediaSelectorToken(
          videoId,
          'HD-1080',
          'stream',
          'web_browser',
          'Subscriber',
          pcToken
        ).then(response => {
          resolve(
            getItemMediaSelector(
              videoId,
              customId,
              response.externalResponse[0].token,
              pcToken,
              isTrailer,
              retryCount + 1
            )
          );
        });
      };
      document.body.appendChild(mediaSelectorScriptTag);
    }
  });

const getItemInfo = itemId =>
  new Promise((resolve, reject) => {
    const opts = {
      device: 'web_browser',
      sub: 'Subscriber',
      segments: [global.Country]
    };

    const callback = function(error, data, response) {
      if (error) {
        DisplayPlayerError();
        reject(data);
      } else {
        resolve(response.body);
      }
    };

    contentApiInstance.getItem(itemId, opts, callback);
  });

// Show next episode countdown

global.nextEpisdeCountDown;
function toggleNextEpisode(nextPlaybackInfo, secondsToWait = 15) {
  $('.player-next-episode')
    .removeClass('out')
    .addClass('active');

  // after animation finish 1s
  setTimeout(() => {
    global.bLazy.revalidate();
  }, 1000);

  let times = secondsToWait;
  global.nextEpisdeCountDown = setInterval(() => {
    $('.episode-countdown .number').text(times);
    if (times === 1) {
      $('.player-next-episode').addClass('out');

      setTimeout(() => {
        $('.player-next-episode').removeClass('active');

        if (global.player) {
          global.player.destroy().then(() => {
            clearInterval(global.watchingInterval);
            clearInterval(global.putWatchingInterval);
            clearInterval(global.nextEpisdeCountDown);

            $('.modal .load-more').removeClass('out');

            const instance = new global.NextComponentClass({
              propsData: {
                data: {
                  isBonusFeatures: false,
                  isLiveStream: false,
                  fullData: global.NextVideoInfo
                }
              }
            });

            instance.showVideoNext(null);
            instance.$destroy();

            $('#my-player').html('<div id="custom-controls"></div>');
          });
        } else {
          const instance = new global.NextComponentClass({
            propsData: {
              data: {
                isBonusFeatures: false,
                isLiveStream: false,
                fullData: global.NextVideoInfo
              }
            }
          });
          instance.showVideoNext(null);
          instance.$destroy();
        }

        // Destroy all
        // setTimeout(() => {
        // CloseVideo();
        // }, 500);
      }, 500);

      if (global.nextEpisdeCountDown) clearInterval(global.nextEpisdeCountDown);
    }

    times--;
  }, 1000);
}

function PlaybackFinished() {
  // $('.close-modal').removeClass('hide');
  // console.log('PlaybackFinished', global.itemInfo);
  // if (global.itemInfo) {
  //  // console.log('Redirect', global.itemInfo);
  //  window.location.href = global.itemInfo.path;
  // }
}

function AddNextEpisodeWatcher() {
  if (global.player) {
    clearInterval(global.watchingInterval);
    clearInterval(global.nextEpisdeCountDown);

    // console.log('Add Next Episode Watcher');

    global.nextEpisodeDisplay = false;
    global.watchingInterval = setInterval(() => {
      const navBar = $('.bmpui-ui-controlbar');
      // if (navBar.length > 0) {
      //   if (navBar.hasClass('bmpui-hidden')) {
      //     $('.close-modal').addClass('hide');
      //   } else {
      //     $('.close-modal').removeClass('hide');
      //   }
      // }

      // console.log(' global.watchingInterval');

      const currentTime = Math.floor(global.player.getCurrentTime());

      // REUSE THIS INTERVAL TO SEND ANALYTIC EVENT
      // FALTA entre 10% y 1% de reproducción
      if (
        !global.pushedPlay90 &&
        calculatePercentage(global.player.getDuration(), currentTime) <= 10 &&
        calculatePercentage(global.player.getDuration(), currentTime) > 1
      ) {
        // console.log('PUSH DATALAYER @play_90');

        global.pushedPlay90 = true;
        global.dataLayer.push({
          event: 'eventSend',
          actionType: 'select',
          actionName: 'play_90',
          eventLabels: {
            duration: global.player.getDuration() * 1000,
            format: global.itemVideoCustomId,
            eventType: 'complete',
            campaignId: 'Player',
            creation: 'play_90~complete',
            container: 'page',
            status: 'success',
            url: global.itemInfo.path
          }
        });
      }
      // FALTA entre 90% y 80% de reproducción
      else if (
        !global.pushedPlay10 &&
        calculatePercentage(global.player.getDuration(), currentTime) <= 90 &&
        calculatePercentage(global.player.getDuration(), currentTime) > 80
      ) {
        // console.log('PUSH DATALAYER @play_10');

        global.pushedPlay10 = true;
        global.dataLayer.push({
          event: 'eventSend',
          actionType: 'select',
          actionName: 'play_10',
          eventLabels: {
            duration: global.player.getDuration() * 1000,
            format: global.itemVideoCustomId,
            eventType: 'complete',
            campaignId: 'Player',
            creation: 'play_10~complete',
            container: 'page',
            status: 'success',
            url: global.itemInfo.path
          }
        });
      }

      if (
        global.NextVideoInfo &&
        currentTime > global.player.getDuration() - 30 &&
        global.NextVideoInfo.type === 'episode' &&
        global.nextEpisodeDisplay === false &&
        global.player.isPlaying()
      ) {
        global.nextEpisodeDisplay = true;
        $('#customNextEpisode')
          .tmpl({
            image: calculateSizeImage(global.NextVideoInfo.images.wallpaper, 'wallpaper', 50),
            title: global.NextVideoInfo.title,
            description: global.NextVideoInfo.shortDescription,
            videoId: global.NextVideoInfo.id
          })
          .appendTo($('#my-player'));
        let secondsToWait = Math.round(global.player.getDuration() - (currentTime + 5));

        if (secondsToWait <= 1) {
          secondsToWait = 5;
        } else {
          secondsToWait = 10;
        }
        toggleNextEpisode(global.NextVideoInfo, secondsToWait);
      }
    }, 2000);
  } else {
    if (global.nextEpisdeCountDown) clearInterval(global.nextEpisdeCountDown);
    if (global.watchingInterval) clearInterval(global.watchingInterval);
  }
}

function closeNextEpisode() {
  // console.log('closeNextEpisode');

  if (global.nextEpisdeCountDown) clearInterval(global.nextEpisdeCountDown);
  if (global.watchingInterval) clearInterval(global.watchingInterval);

  $('.player-next-episode').addClass('out');

  setTimeout(() => {
    $('.player-next-episode').removeClass('active');
  }, 1000);
}

function PlayerEventSeeked() {
  // Watcher removed on seek, added again after play again
  AddNextEpisodeWatcher();

  const currentTime = Math.floor(global.player.getCurrentTime());
  putWatching(global.currentItemId, currentTime).then(response => {});
}

function PlayerEventSeek(event) {
  if (event.issuer === 'ui') {
    // console.log('PUSH DATALAYER @Scrub');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'scrub',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });
  }

  if (global.nextEpisdeCountDown) {
    // Close next episode on player seek
    // console.log('Remove Waatcher Again');
    closeNextEpisode();
  }
}

function PlayerEventPlaying(event) {
  if (event.issuer === 'ui') {
    // console.log('PUSH DATALAYER @Play');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'play',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });
  }
}

function PlayerEventPaused(event) {
  if (event.issuer === 'ui') {
    // console.log('PUSH DATALAYER @Pause');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'pause',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });
  }

  try {
    const currentTime = Math.floor(global.player.getCurrentTime());
    putWatching(global.currentItemId, currentTime).then(response => {});
  } catch {
    // console.log('error putWatching');
  }
}

function PlayerEventStallStarted() {
  // console.log('PUSH DATALAYER @Buffering');
  global.dataLayer.push({
    event: 'mediaEventSend',
    actionType: 'buffering',
    actionName: 'select',
    eventLabels: {
      duration: global.player.getDuration() * 1000,
      name: global.itemInfo.title,
      starting: global.itemVideoStartingPosition * 1000,
      volume: global.player.getVolume(),
      windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
      format: global.itemVideoCustomId,
      container: 'Player',
      playlist: 'none',
      mediaPlayerName: 'Bitmovin',
      mediaPlayerVersion: global.player.version,
      url: global.itemInfo.path
    }
  });
}

function PlayerEventStallEnded() {
  // console.log('PUSH DATALAYER @NotBuffering');
  global.dataLayer.push({
    event: 'mediaEventSend',
    actionType: 'not buffering',
    actionName: 'select',
    eventLabels: {
      duration: global.player.getDuration() * 1000,
      name: global.itemInfo.title,
      starting: global.itemVideoStartingPosition * 1000,
      volume: global.player.getVolume(),
      windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
      format: global.itemVideoCustomId,
      container: 'Player',
      playlist: 'none',
      mediaPlayerName: 'Bitmovin',
      mediaPlayerVersion: global.player.version,
      url: global.itemInfo.path
    }
  });
}

function PlayerEventDestroy() {
  // console.log('PUSH DATALAYER @Stop');
  // global.dataLayer.push({ 'event': 'eventSend', 'actionType': 'stop', 'actionName': 'select', 'eventLabels': { 'duration': global.player.getDuration() * 1000, 'format': global.itemVideoCustomId, 'container': 'page', 'url': global.itemInfo.path } });
}

const config = {
  key: '37bf7581-f96e-4c92-9f9b-31297e8a9507',
  ui: false, // disable the built-in UI
  /* remotecontrol: {
    type: 'googlecast',
    receiverApplicationId: constants[constants.environment].chromecastID
  }, */
  playback: {
    autoplay: true
  },
  adaptation: {
    desktop: {
      limitToPlayerSize: true
    },
    mobile: {
      limitToPlayerSize: true
    }
  },
  // logs: { level: 'debug' },
  network: {
    preprocessHttpResponse: (type, response) => {
      // Check if current HTTP response is a subtitle
      if (type === 'media/subtitles') {
        // Regexp Patterns to find all <tt:tagname> start and end elements
        const ttpPatternStart = /<tt:/gi;
        const ttpPatternEnd = /(<\/tt:)/gi;
        // Parse response body and replace all occurrences with its replacement
        response.body = response.body.replace(ttpPatternStart, '<').replace(ttpPatternEnd, '</');
        // Convert sub to xml
        const xmlSubsDoc = $.parseXML(response.body);
        global.jQueryXmlSubDoc = $(xmlSubsDoc);
        const regions = global.jQueryXmlSubDoc.find('region');
        if (regions.length > 0) {
          for (let i = 0; i < regions.length; i++) {
            const region = regions[i];
            if (
              region.hasAttribute('xml:id') &&
              region.attributes['xml:id'].value.indexOf('bottom') === -1 &&
              region.hasAttribute('tts:origin') &&
              region.hasAttribute('tts:displayAlign') &&
              region.attributes['tts:displayAlign'].value === 'after'
            ) {
              const regionAttr = region.attributes;
              const originAttr = regionAttr['tts:origin'];
              const originValue = originAttr.value;
              const splittedOriginValue = originValue.split(' ');
              const firstOriginValue = splittedOriginValue[0];
              const secondOriginValue = splittedOriginValue[1];
              const floatSecondOriginValue = parseFloat(secondOriginValue);
              if (floatSecondOriginValue >= 40 && floatSecondOriginValue <= 70) {
                originAttr.value = `${firstOriginValue} 80%`;
              }
              const extentAttr = regionAttr['tts:extent'];
              const extentValue = extentAttr.value;
              const splittedExtentValue = extentValue.split(' ');
              const firstExtentValue = splittedExtentValue[0];
              const secondExtentValue = splittedExtentValue[1];
              const floatSecondExtentValue = parseFloat(secondExtentValue);
              if (floatSecondExtentValue > 20) {
                extentAttr.value = `${firstExtentValue} 20%`;
              }
            }
          }
          const xmlString = new XMLSerializer().serializeToString(global.jQueryXmlSubDoc[0]);
          response.body = xmlString;
        }
      }
    }
  }
};

// config.ui = false;

const setVolume = val => {
  // console.log('SetVolume() => ', val);
  const player = document.getElementById('bitmovinplayer-video-my-player');
  player.volume = val;
  global.volume = val;
  const element = $('.icon-volume > i');
  if (player.volume === 0) {
    element.removeClass('icon-sound icon-sound-medium').addClass('icon-mute');
  } else if (player.volume >= 0.7) {
    element.removeClass('icon-mute icon-sound-medium').addClass('icon-sound');
  } else {
    element.removeClass('icon-mute icon-sound').addClass('icon-sound-medium');
  }

  if (global.localStorage) {
    global.localStorage.setItem(localStorageVolumneValue, global.volume);
  }
};

global.player = null;
global.NextVideoInfo = null;

// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------BUILD VIDEO LOGIC ------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------

function moveCustomControls() {
  const player = $('#my-player');
  const lastElement = player.children();
  if (!lastElement.last().is('#custom-controls')) {
    player.append($('#custom-controls').remove());
  }
}

$(() => {
  // PLAYER FUNCTIONS //
  const container = document.getElementById('my-player');

  $(document).on('click', '#videoNext', event => {
    event.preventDefault();

    $('.modal .load-more').removeClass('out');
    // $('#custom-controls').empty();

    clearInterval(global.watchingInterval);
    clearInterval(global.putWatchingInterval);
    clearInterval(global.nextEpisdeCountDown);

    if (!container.hasAttribute('data-fullscreen')) {
      container.setAttribute('data-fullscreen', 'false');
    }

    // console.log('VIDEO NEXT');
    global.player.setViewMode('Inline');
    // global.player.pause();
    global.player.unload().then(() => {
      global.player.destroy().then(() => {
        // console.log('PLayer Destroyed on Next');

        global.player = null;

        const instance = new global.NextComponentClass({
          propsData: {
            data: {
              isBonusFeatures: false,
              isLiveStream: false,
              fullData: global.NextVideoInfo
            }
          }
        });
        // Call Show Video
        instance.showVideoNext(null);
        instance.$destroy();

        $('#my-player').html('<div id="custom-controls"></div>');
      });
    });

    // TODO: Usar Destroy y en el Then llamar al   instance.showVideo(null);

    // global.player.unload().then(() => {
    //  // $('#bitmovinplayer-video-my-player').remove();
    //  // $('#my-player').empty();
    //  $('#my-player')
    //    .find('*')
    //    .not('.close-modal')
    //    .not('.icon-cross')
    //    .remove();

    //  console.log('Video Next');

    //  // SIMULATE CLICK
    //  const instance = new global.NextComponentClass({
    //    propsData: {
    //      data: {
    //        isBonusFeatures: false,
    //        isLiveStream: false,
    //        fullData: global.NextVideoInfo
    //      }
    //    }
    //  });
    //  instance.showVideo(null);
    //  instance.$destroy();
    //  // CloseVideo();
    // });
  });

  $(document).on('click', '.player-fullscreen .close-next-episode', event => {
    event.preventDefault();
    closeNextEpisode();
  });

  $(document).on('click', '.player-fullscreen .actions > a', event => {
    event.preventDefault();
    closeNextEpisode();
  });
  $(document).on('click', '.player-fullscreen .play-next-episode ', event => {
    event.preventDefault();

    $('.modal .load-more').removeClass('out');

    clearInterval(global.watchingInterval);
    clearInterval(global.putWatchingInterval);
    clearInterval(global.nextEpisdeCountDown);

    if (!container.hasAttribute('data-fullscreen')) {
      container.setAttribute('data-fullscreen', 'false');
    }

    // console.log('.play-next-episode');

    // console.log('Next Episode');
    global.player.setViewMode('Inline');

    global.player.pause();

    global.player.destroy().then(() => {
      // console.log('Player destroyed on next');
      const instance = new global.NextComponentClass({
        propsData: {
          data: {
            isBonusFeatures: false,
            isLiveStream: false,
            fullData: global.NextVideoInfo
          }
        }
      });
      instance.showVideoNext(null);
      instance.$destroy();

      $('#my-player').html('<div id="custom-controls"></div>');
    });

    // TODO: Usar Destroy y en el Then llamar al   instance.showVideo(null);

    // global.player.unload().then(() => {
    //  $('#my-player')
    //    .find('*')
    //    .not('.close-modal')
    //    .not('.icon-cross')
    //    .remove();

    //  // global.player.destroy().then(() => { });

    //  const instance = new global.NextComponentClass({
    //    propsData: {
    //      data: {
    //        isBonusFeatures: false,
    //        isLiveStream: false,
    //        fullData: global.NextVideoInfo
    //      }
    //    }
    //  });
    //  instance.showVideo(null);
    //  instance.$destroy();
    //  // CloseVideo();
    // });
  });

  // Close Video Modal
  // $(document).on('click', '.close-modal', event => {
  //  CloseVideo();
  // });

  // // Just Preloader Animation
  // $('.player-fullscreen .load-more .load-animation').each((index, element) => {
  //  const animation = global.bodymovin.loadAnimation({
  //    container: element,
  //    renderer: 'svg',
  //    loop: true,
  //    autoplay: true,
  //    path: getUrlImageStatic('animations/load.json')
  //  });
  // });

  // Video Seek +10 or -10

  $(document).on('click', '#videoNextSeconds', () => {
    // console.log('PUSH DATALAYER @Forward');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'forward',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });

    // console.log('Seek v3 + 10', container);
    if (document.seekTime === undefined || document.seekTime === 0) {
      document.seekTime = global.player.getCurrentTime() + 10;
    } else {
      document.seekTime += 10;
    }

    if (document.skipTimeout !== undefined) {
      clearTimeout(document.skipTimeout);
    }

    document.skipTimeout = setTimeout(() => {
      if (document.seekTime !== 0) {
        global.player.seek(document.seekTime);
        document.seekTime = 0;
      }
    }, 500);
  });

  $(document).on('click', '#videoPrevSeconds', () => {
    // console.log('PUSH DATALAYER @Rewind');
    global.dataLayer.push({
      event: 'mediaEventSend',
      actionType: 'rewind',
      actionName: 'select',
      eventLabels: {
        duration: global.player.getDuration() * 1000,
        name: global.itemInfo.title,
        starting: global.itemVideoStartingPosition * 1000,
        volume: global.player.getVolume(),
        windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
        format: global.itemVideoCustomId,
        container: 'Player',
        playlist: 'none',
        mediaPlayerName: 'Bitmovin',
        mediaPlayerVersion: global.player.version,
        url: global.itemInfo.path
      }
    });

    // console.log('Seek v3 - 10', container);
    if (document.seekTime === undefined || document.seekTime === 0) {
      document.seekTime = global.player.getCurrentTime() - 10;
    } else {
      document.seekTime -= 10;
    }

    if (document.skipTimeout !== undefined) {
      clearTimeout(document.skipTimeout);
    }

    document.skipTimeout = setTimeout(() => {
      if (document.seekTime !== 0) {
        global.player.seek(document.seekTime);
        document.seekTime = 0;
      }
    }, 500);
  });

  $(document).on('click', '.subtitles-button ul li', e => {
    const ul = $(e.currentTarget).parent();
    $(e.currentTarget)
      .siblings()
      .removeClass('active');

    $(e.currentTarget).addClass('active');

    if (ul.hasClass('font-size')) {
      const value = $(e.currentTarget).attr('data-value');

      if (global.localStorage) {
        global.localStorage.setItem(localStorageSubtitleSize, value);
      }

      global.scaleSubtitles(parseInt(value, 10));
    } else {
      const value = $(e.currentTarget).attr('data-value');
      global.subtitlesOff(value !== 'activated');
    }
  });

  window.addEventListener('orientationchange', event => {
    moveCustomControls();
  });
});

global.buildVideo = (itemId, isTrailer = false, token = '') => {
  global.isTrailerContent = isTrailer;

  if (global.heroSlider) {
    global.heroSlider.autoplay.pause();
  }
  // Make sure all is destroyed before play next video.
  if (global.watchingInterval) clearInterval(global.watchingInterval);
  if (global.putWatchingInterval) clearInterval(global.putWatchingInterval);
  if (global.nextEpisdeCountDown) clearInterval(global.nextEpisdeCountDown);

  // Close Video Modal
  $(document).on('click', '.close-modal', event => {
    CloseVideo();
  });

  global.NextVideoInfo = null;
  global.player = null;
  global.pushedPlay10 = false;
  global.pushedPlay90 = false;

  /* FIXES FOR IE 11 */
  // Hide main nav when video player is present
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
    $('header.main-header').css('z-index', '0');
  }

  // Remove Splash if exists
  $('.splash-content').remove();
  $('.modal').removeClass('splash');
  // $('.close-modal').addClass('hide');

  // Always set token (in case of refresh token)
  refreshToken();

  const container = document.getElementById('my-player');
  global.currentItemId = itemId;

  if (container) {
    // Remove next episode count container for prevent duplication
    $('.player-next-episode').remove();

    // Remove next episode button to reset functionality
    $('#nextPrevButtons').remove();

    container.setAttribute('data-fullscreen', 'false');

    let videoInfo;
    let videoPosition = 0;

    // TODO: GET PROFILE

    // const getProfilePromise =
    //  (new Promise(getData)).then(() => {
    //    console.log('GetProfile from player');
    // });

    Promise.all([
      getItemInfo(itemId), // To Get the info of the Event
      getItemMediaSelectorToken(itemId, 'HD-1080', 'stream', 'web_browser', 'Subscriber', token), // Get User Token
      getWatching(itemId), // To Seek (Continue Watching)
      getNextWatching(itemId) // To check if has next episode
    ])
      .then(values => {
        const continueWatchingData = values[2].externalResponse;
        const nextPlaybackResponse = values[3].externalResponse;

        global.watchedInfo = continueWatchingData;
        global.itemInfo = values[0].externalResponse;

        // console.log('values = > bitmovin.js', values);

        if (nextPlaybackResponse && nextPlaybackResponse.next) {
          // console.log('SETnextPlaybackInfo =>');

          global.NextVideoInfo = nextPlaybackResponse.next;
        }

        if (continueWatchingData.position && continueWatchingData.position > 0) {
          videoPosition = continueWatchingData.position;
        }

        videoInfo = values[0].externalResponse;

        const mediaSelectorTokenData = values[1];

        const itemCustomId = mediaSelectorTokenData.externalResponse[0].url;
        const itemToken = mediaSelectorTokenData.externalResponse[0].token;

        global.itemVideoCustomId = itemCustomId;

        return getItemMediaSelector(itemId, itemCustomId, itemToken, token, isTrailer);
      })
      .then(mediaSelectorResponse => {
        if (mediaSelectorResponse.result !== 'selectionunavailable') {
          const medias = mediaSelectorResponse.media;

          const videos = medias.filter(media => media.kind === 'video')[0].connection;

          const captionsFilter = medias.filter(media => media.kind === 'captions')[0];

          let captions = '';
          if (captionsFilter) {
            captions = medias.filter(media => media.kind === 'captions')[0].connection;
          }

          const videoUrlListDash = videos.filter(
            video => video.protocol === 'https' && video.transferFormat === 'dash'
          );

          const videoUrlListHLS = videos.filter(
            video => video.protocol === 'https' && video.transferFormat === 'hls'
          );

          let videoUrlDash = '';
          if (videoUrlListDash.length > 0) {
            videoUrlDash =
              videoUrlListDash[Math.floor(Math.random() * videoUrlListDash.length)].href;
          }

          let videoUrlHLS = '';
          if (videoUrlListHLS.length > 0) {
            videoUrlHLS = videoUrlListHLS[Math.floor(Math.random() * videoUrlListHLS.length)].href;
          }

          let captionUrlList;
          let captionUrl;
          if (captions.length > 0) {
            captionUrlList = captions?.filter(caption => caption.protocol === 'https');
            captionUrl = captionUrlList[Math.floor(Math.random() * captionUrlList.length)].href;
          }

          // THUMBNAILS LOADING //

          let finalThumbsUrl = '';
          const thumbnailsFilter = medias.filter(media => media.kind === 'thumbnails')[0];
          if (thumbnailsFilter) {
            const thumbnails = thumbnailsFilter.connection;

            const thumbnailUrlList = thumbnails.filter(thumbnail => thumbnail.protocol === 'https');
            const thumbnailUrl =
              thumbnailUrlList[Math.floor(Math.random() * thumbnailUrlList.length)].href;

            try {
              const parsedUrl = new URL(thumbnailUrl);

              const base64path = btoa(parsedUrl.pathname);
              const base64queryString = btoa(parsedUrl.search);

              finalThumbsUrl = `${
                constants[constants.environment].apiContent
              }/v1/thumbnail?qs=${base64queryString}&fn=${base64path}&ch=${parsedUrl.hostname}`;
            } catch (e) {
              // console.log('error');
            }
          }

          let analyticsVideoTitle;

          if (videoInfo.title === null || videoInfo.title === '') {
            analyticsVideoTitle = videoInfo.contextualTitle;
          } else if (videoInfo.contextualTitle === null || videoInfo.contextualTitle === '') {
            analyticsVideoTitle = videoInfo.title;
          } else {
            analyticsVideoTitle = `${videoInfo.title} ${videoInfo.contextualTitle}`;
          }

          // Background pre-loading Image (Bitmovin Video player)
          let wallpaperImage = '';
          try {
            const { wallpaper } = videoInfo.images;
            if (typeof wallpaper !== 'undefined') {
              wallpaperImage = calculateSizeImage(wallpaper, 'wallpaper', 60, 1400, 2800);
              wallpaperImage = wallpaperImage.replace(/'/gi, '%27');
            }
          } catch {
            // console.log('Error image');
          }

          // console.log('VideoInfo', videoInfo);

          let videoDescription = '';
          if (videoInfo.type === 'episode') {
            // if (videoInfo.seasonTitle) {
            //  videoDescription = videoInfo.seasonTitle
            // }
            // if (videoInfo.episodeName) {
            //  videoDescription += ` - ${videoInfo.episodeName}`;
            // }
            videoDescription = videoInfo.title;
          }

          let source = {};
          source = {
            title: videoInfo.type === 'episode' ? videoInfo.showTitle : videoInfo.title,
            description: videoDescription,
            dash: videoUrlDash,
            poster: wallpaperImage,
            analytics: {
              key: '69bab32b-7905-4aa2-ae25-06edb1ebf460',
              videoId: videoInfo.id,
              title: analyticsVideoTitle
            },
            thumbnailTrack: {
              url: finalThumbsUrl
            }
          };

          if (videoUrlHLS !== '') source.hls = videoUrlHLS;
          if (videoUrlDash !== '') source.dash = videoUrlDash;

          // global.player = new global.bitmovin.player.Player(container, config);
          global.player = new Player(container, config);

          // const ui = global.bitmovin.playerui.UIFactory.buildDefaultSmallScreenUI(global.player);
          const ui = UIFactory.buildDefaultSmallScreenUI(global.player);

          global.player.load(source).then(
            () => {
              const enSubtitle = {
                id: 'sub1',
                lang: 'en',
                label: 'English',
                url: captionUrl,
                kind: 'subtitle'
              };

              global.player.subtitles.add(enSubtitle);

              /* if (global.localStorage) {
                const subId = global.localStorage.getItem(localStorageSubtitleKey);
                const subSize = global.localStorage.getItem(localStorageSubtitleSize);
                const volumeValue = global.localStorage.getItem(localStorageVolumneValue);

                if (subId) {
                  global.player.subtitles.enable(subId);
                } else {
                  $('.subtitles-button .content-subtitles .activated-subtitle li').removeClass(
                    'active'
                  );
                  $(
                    '.subtitles-button .content-subtitles .activated-subtitle li[data-value="desactivated"]'
                  ).addClass('active');
                }

                if (subSize) {
                  $('.subtitles-button .content-subtitles .font-size li').removeClass('active');
                  $(
                    `.subtitles-button .content-subtitles .font-size li[data-value="${subSize}"]`
                  ).addClass('active');

                  global.scaleSubtitles(parseInt(subSize, 10));
                }

                if (volumeValue) {
                  setVolume(volumeValue);
                }
                else {
                  setVolume(global.volume);
                }
              }
              else {
                setVolume(global.volume);
              } */

              if (videoPosition > 0 && videoPosition < global.player.getDuration() - 60) {
                global.player.seek(videoPosition);
                global.itemVideoStartingPosition = videoPosition;
              }
              else {
                global.itemVideoStartingPosition = 0;
              }

              // console.log('PUSH DATALAYER @StartPlayer');
              global.dataLayer.push({
                event: 'mediaEventSend',
                actionType: 'startPlayer',
                actionName: 'select',
                eventLabels: {
                  duration: global.player.getDuration() * 1000,
                  starting: global.itemVideoStartingPosition * 1000,
                  volume: global.player.getVolume(),
                  windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
                  format: global.itemVideoCustomId,
                  container: 'Player',
                  url: global.itemInfo.path
                }
              });

              // $('#my-player').append(
              //   $('.close-modal')
              //     .removeClass('hide')
              //     .remove()
              // );

              if ($('.custom-player').length > 0) {
                $('#customControls')
                  .tmpl()
                  .appendTo($('#custom-controls'));

                const slide = document.getElementById('vol-control');

                if (global.localStorage) {
                  const volumeValue = global.localStorage.getItem(localStorageVolumneValue);
                  if (volumeValue) {
                    global.volume = volumeValue;
                  }
                }

                global.noUiSlider.create(document.getElementById('vol-control'), {
                  start: global.volume * 100,
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

                $(document).on('click', '.icon-volume', e => {
                  const actualVolume = slide.noUiSlider.get() / 100;
                  // Mute
                  if (actualVolume !== 0) {
                    global.volumePrevMuted = slide.noUiSlider.get() / 100;
                    slide.noUiSlider.set(0);
                    setVolume(slide.noUiSlider.get() / 100);
                  } else {
                    slide.noUiSlider.set(global.volumePrevMuted * 100);
                    setVolume(slide.noUiSlider.get() / 100);
                  }

                  return false;
                });

                if (global.localStorage) {
                  const subId = global.localStorage.getItem(localStorageSubtitleKey);
                  const subSize = global.localStorage.getItem(localStorageSubtitleSize);
                  const volumeValue = global.localStorage.getItem(localStorageVolumneValue);

                  if (subId) {
                    try {
                      global.player.subtitles.enable(subId);
                    } catch {
                      // console.log('Enable Subtitles (er)');
                    }
                  } else {
                    $('.subtitles-button .content-subtitles .activated-subtitle li').removeClass(
                      'active'
                    );
                    $(
                      '.subtitles-button .content-subtitles .activated-subtitle li[data-value="desactivated"]'
                    ).addClass('active');
                  }

                  if (subSize) {
                    $('.subtitles-button .content-subtitles .font-size li').removeClass('active');
                    $(
                      `.subtitles-button .content-subtitles .font-size li[data-value="${subSize}"]`
                    ).addClass('active');

                    global.scaleSubtitles(parseInt(subSize, 10));
                  }

                  if (volumeValue) {
                    setVolume(volumeValue);
                  }
                  else {
                    setVolume(global.volume);
                  }
                }
                else {
                  setVolume(global.volume);
                }

                if (global.NextVideoInfo && $('#customEpisodeButtons').length > 0) {
                  $('#customEpisodeButtons')
                    .tmpl({
                      title: videoInfo.type === 'episode' ? videoInfo.showTitle : videoInfo.title,
                      description: videoDescription,
                      videoId: global.NextVideoInfo.id
                    })
                    .appendTo($('#custom-controls'));
                }
              }

              setTimeout(() => {
                $('.animation.load-more').addClass('out');
                $('#my-player').append($('#custom-controls').remove());
              }, 1000);
            },
            reason => console.log('Error while creating Bitmovin Player instance', reason)
          );

          // $(document).on(
          //   {
          //     mousemove() {
          //       $('.modal').addClass('move');
          //     },
          //     mousemoveend() {
          //       // DELETED BECAUSE OF PERFORMANCE ISSUES. MEMORY ACCUMULATES OVER EACH PLAY.
          //       // $.initialize('.bmpui-controls-hidden', (index, event) => {
          //       //  $('.modal').addClass('move-out');
          //       //  setTimeout(() => {
          //       //    $('.modal').removeClass('move-out move');
          //       //  }, 600);
          //       // });
          //     }
          //   },
          //   '.player-fullscreen'
          // );

          // $(document).on(
          //   {
          //     mouseenter() {
          //       $('.modal').addClass('hover');
          //     },
          //     mouseleave() {
          //       $('.modal').removeClass('hover');
          //     }
          //   },
          //   '.close-modal'
          // );

          // $(document).on('click', '.player-fullscreen #play-pause', event => {
          //   event.preventDefault();
          //   if (global.player.isPaused()) {
          //     global.player.play();
          //   } else {
          //     global.player.pause();
          //   }
          // });

          // Splash not used anymore

          // $(document).on('click', '.splash .splash-content a', event => {
          //  event.preventDefault();
          //  $('.modal').removeClass('splash');
          //  // $('#play-pause').removeClass('off');
          //  global.player.play();
          // });

          global.player.on(PlayerEvent.Seeked, PlayerEventSeeked);
          global.player.on(PlayerEvent.Seek, PlayerEventSeek);
          global.player.on(PlayerEvent.Paused, PlayerEventPaused);
          global.player.on(PlayerEvent.PlaybackFinished, PlaybackFinished);

          global.player.on(PlayerEvent.Playing, PlayerEventPlaying);
          global.player.on(PlayerEvent.Destroy, PlayerEventDestroy);

          global.player.on(PlayerEvent.StallStarted, PlayerEventStallStarted);
          global.player.on(PlayerEvent.StallEnded, PlayerEventStallEnded);

          global.player.on(PlayerEvent.SubtitleEnabled, e => {
            if (global.localStorage) {
              const subtitleId = e.subtitle.id;
              global.localStorage.setItem(localStorageSubtitleKey, subtitleId);
            }
          });

          global.player.on(PlayerEvent.SubtitleDisabled, e => {
            if (global.localStorage) {
              const subtitleId = e.subtitle.id;
              global.localStorage.removeItem(localStorageSubtitleKey);
            }
          });

          global.player.on(PlayerEvent.ViewModeChanged, e => {
            // console.log('PUSH DATALAYER @WindowState');
            global.dataLayer.push({
              event: 'mediaEventSend',
              actionType: 'windowState',
              actionName: 'click',
              eventLabels: {
                duration: global.player.getDuration() * 1000,
                starting: global.itemVideoStartingPosition * 1000,
                volume: global.player.getVolume(),
                windowState: global.player.getViewMode() === 'fullscreen' ? 'Full' : 'Normal',
                format: global.itemVideoCustomId,
                container: 'Player',
                url: global.itemInfo.path
              }
            });
          });

          global.player.on(PlayerEvent.SubtitleAdded, () => {
            if (global.localStorage) {
              const subId = global.localStorage.getItem(localStorageSubtitleKey);
              const subSize = global.localStorage.getItem(localStorageSubtitleSize);

              if (subId) {
                global.player.subtitles.enable(subId);
              } else {
                $('.subtitles-button .content-subtitles .activated-subtitle li').removeClass(
                  'active'
                );
                $(
                  '.subtitles-button .content-subtitles .activated-subtitle li[data-value="desactivated"]'
                ).addClass('active');
              }

              if (subSize) {
                $('.subtitles-button .content-subtitles .font-size li').removeClass('active');
                $(
                  `.subtitles-button .content-subtitles .font-size li[data-value="${subSize}"]`
                ).addClass('active');

                global.scaleSubtitles(parseInt(subSize, 10));
              }
            }
          });

          global.player.on(PlayerEvent.Play, () => {
            moveCustomControls();
          });

          // global.player.on(global.bitmovin.player.PlayerEvent.PlayerResized, () => {
          //   if (global.playerResize !== undefined) {
          //     clearTimeout(global.playerResize);
          //   }

          //   global.playerResize = setTimeout(() => {
          //     $.each($('.bmpui-ui-controlbar'), (index, element) => {
          //       if ($(element).find('.custom-buttons').length === 0) {
          //         $('#customControls')
          //           .tmpl()
          //           .appendTo(element);

          //         if (global.NextVideoInfo && $('#customEpisodeButtons').length > 0) {
          //           $('#customEpisodeButtons')
          //             .tmpl({
          //               videoId: global.NextVideoInfo.id
          //             })
          //             .appendTo(element);
          //         }

          //         const slide = $(element).find('.volume .input > div');
          //         global.noUiSlider.create(slide[0], {
          //           start: global.volume * 100,
          //           step: 1,
          //           connect: [true, false],
          //           direction: 'rtl',
          //           orientation: 'vertical',
          //           range: {
          //             min: 0,
          //             max: 100
          //           }
          //         });
          //         slide[0].noUiSlider.on('change', value => {
          //           setVolume(value / 100);
          //         });
          //         $('.volume .input').on('mousewheel', e => {
          //           if (e.originalEvent.wheelDelta / 120 > 0) {
          //             parseInt(slide[0].noUiSlider.get(), 10) <= 95
          //               ? slide[0].noUiSlider.set(parseInt(slide[0].noUiSlider.get(), 10) + 2)
          //               : slide[0].noUiSlider.set(100);
          //           } else {
          //             parseInt(slide[0].noUiSlider.get(), 10) >= 5
          //               ? slide[0].noUiSlider.set(parseInt(slide[0].noUiSlider.get(), 10) - 2)
          //               : slide[0].noUiSlider.set(0);
          //           }
          //           setVolume(slide[0].noUiSlider.get() / 100);

          //           return false;
          //         });
          //         $('.icon-volume').on('click', e => {
          //           const actualVolume = slide[0].noUiSlider.get() / 100;

          //           // Mute
          //           if (actualVolume !== 0) {
          //             global.volumePrevMuted = slide[0].noUiSlider.get() / 100;
          //             slide[0].noUiSlider.set(0);
          //             setVolume(slide[0].noUiSlider.get() / 100);
          //           } else {
          //             slide[0].noUiSlider.set(global.volumePrevMuted * 100);
          //             setVolume(slide[0].noUiSlider.get() / 100);
          //           }

          //           return false;
          //         });

          //         if (global.localStorage) {
          //           const subId = global.localStorage.getItem(localStorageSubtitleKey);
          //           const subSize = global.localStorage.getItem(localStorageSubtitleSize);

          //           console.log('SubId', subId);
          //           if (subId) {
          //             try {
          //               global.player.subtitles.enable(subId);
          //             } catch {
          //               console.log('Enable Subtitles (er)');
          //             }
          //           } else {
          //             $('.subtitles-button .content-subtitles .activated-subtitle li').removeClass(
          //               'active'
          //             );
          //             $(
          //               '.subtitles-button .content-subtitles .activated-subtitle li[data-value="desactivated"]'
          //             ).addClass('active');
          //           }

          //           if (subSize) {
          //             $('.subtitles-button .content-subtitles .font-size li').removeClass('active');
          //             $(
          //               `.subtitles-button .content-subtitles .font-size li[data-value="${subSize}"]`
          //             ).addClass('active');

          //             global.scaleSubtitles(parseInt(subSize, 10));
          //           }
          //         }

          //         $('#my-player').append(
          //           $('.close-modal')
          //             .removeClass('hide')
          //             .remove()
          //         );
          //       }
          //     });
          //   }, 400);

          //   // $('#customControls')
          //   //   .tmpl()
          //   //   .appendTo($('.bmpui-ui-controlbar'));
          // });

          // Video ContinueWatching
          global.putWatchingInterval = setInterval(() => {
            if (global.player.isPlaying() && !global.isTrailerContent) {
              const currentTime = Math.floor(global.player.getCurrentTime());
              putWatching(videoInfo.id, currentTime).then(response => {});
            }
          }, 10000);

          // NEXT INTERVAL CHECK
          AddNextEpisodeWatcher();
        } else {
          // MEDIA UNAVAILABLE

          DisplayPlayerError();

          /* FIXES FOR IE 11 */
          // Hide main nav when video player is present
          if (
            navigator.userAgent.indexOf('MSIE') !== -1 ||
            navigator.appVersion.indexOf('Trident/') > -1
          ) {
            $('header.main-header').removeAttr('style');
          }
        }
      })
      .catch(reason => {
        DisplayPlayerError();
      });
  }
};
