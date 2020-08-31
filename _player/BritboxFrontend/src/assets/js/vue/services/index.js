/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
import find from 'lodash/find';
import compact from 'lodash/compact';
import sortBy from 'lodash/sortBy';
import { setCookie, getCookie, setCookieAuthKey } from '../../lib/global';
import { BritboxAccountApi, refreshToken } from '../../lib/sdk';
import store from '../store';
import constants from '../../lib/constants';

const transformArrayWatchedElements = (elements, elementsIn) => {
  const noUndefined = anyValue => typeof anyValue !== 'undefined';
  const elementsWatching = Object.entries(elements).map(item => {
    const [key, value] = item;

    const element = find(elementsIn.items, o => parseInt(o.id, 10) === parseInt(key, 10));

    if (typeof element !== 'undefined') {
      const element = {};

      element[key] = value;
      return element;
    }
  }).filter(noUndefined);

  const elementsWatchingList = elementsWatching.map(item => {
    if (typeof item !== 'undefined') {
      const key = Object.entries(item)
        .reduce(item => item)
        .reduce(index => index);
      const id = parseInt(key, 10);
      return { id, ...item[key] };
    }
  });
  const elementsList = compact(elementsWatchingList);

  return elementsList;
};

const transformArrayBookmarkElements = (elements, elementsIn) => {

  const noUndefined = anyValue => typeof anyValue !== 'undefined';
  const elementsBookmarks = Object.entries(elements).map(item => {
    const [key, value] = item;

    const element = find(elementsIn.items, o => parseInt(o.id, 10) === parseInt(key, 10));

    if (typeof element !== 'undefined') {

   

      element.date = value;
      return {
        id: key,
        date: value
      };
    }
  }).filter(noUndefined);

  return elementsBookmarks;
};

global.refreshTimes = 0;

// Get Profile Data: Continue Watching / Watchlist / User Name / Authtoken and Refresh Token
const getData = () => {

  const opts = {
    useCustomId: constants[constants.environment].useBBCCustomID,
    segments: [global.Country]
  };

  const apiInstance = new BritboxAccountApi.ProfileApi();
  const getProfileCallback = (error, data, response) => {

    if (error) {
      if (error.status === 401 || error.status === 500) {
        // GET PROFILE ERROR. TRY REFRESH TOKEN
        store.commit('setAuthLoading');

        // Refresh Token Call
        const refreshData = { value: '', isD3: false };
        $.post(global.libs.Constants.account, refreshData, data => {
          if (data.ResponseCode !== '0') {
            // REFRESH TOKEN SUCCESS

            if (data !== '') {
              // Update authKey with new Authentication Token Value
              const { AuthKey, ExpiresIn } = data;

              setCookieAuthKey('authkey', AuthKey, ExpiresIn);

              if (global.refreshTimes === 0) {
                // Sets new auth key to future calls
                refreshToken();

                // Load profile using new AuthKey


                apiInstance.getProfile(opts, getProfileCallback);
                global.refreshTimes++;
              }
            } else {
              store.commit('setUserDataError', true);
              // Delete UserStatus Cookie
              setCookie('SessionStatus', '', -1);
              // Delete RefreshToken Cookie
              setCookie('ert', '', -1);
            }
          } else {
            // REFRESH TOKEN ERROR
            store.commit('setUserDataError', true);

            // Delete UserStatus Cookie
            setCookie('SessionStatus', '', -1);
            // Delete RefreshToken Cookie
            setCookie('ert', '', -1);
          }
        });
      } else {
        // OTHER ERROR
        store.commit('setUserDataError', true);

      }
    } else {
      // Get Profile Success

      const watchedList = transformArrayWatchedElements(
        response.body.watched,
        response.body.watchedList
      );

      if (watchedList.length > 0) {
        response.body.watched = sortBy(watchedList, ['lastWatchedDate']).reverse();
      }

      if (!Array.isArray(response.body.watched)) {
        response.body.watched = [];
      }

      const bookmarksList = transformArrayBookmarkElements(
        response.body.bookmarks,
        response.body.bookmarkList
      );

      if (bookmarksList.length > 0) {
        response.body.bookmarks = bookmarksList;
      }

      store.commit('setUserData', response.body);
      global.refreshTimes = 0;
    }
  };

  // CHECK OLDER TOKENS TO REFRESH
  const oldTokens = window.localStorage.getItem('session.tokens');
  const alreadyFetchedKey = window.localStorage.getItem('tkf_saf');

  if (oldTokens !== null && alreadyFetchedKey == null) {
    store.commit('setAuthLoading');

    try {
      const parsedToken = JSON.parse(oldTokens);
      const tokenToUse = parsedToken[0].value;

      const refreshData = { value: tokenToUse, isD3: true };

      $.post(global.libs.Constants.account, refreshData, data => {
        if (data.ResponseCode !== '0') {
          // REFRESH TOKEN SUCCESS
          if (data !== '') {
            // Update authKey with new Authentication Token Value
            const { AuthKey, ExpiresIn } = data;

            setCookieAuthKey('authkey', AuthKey, ExpiresIn);

            // window.localStorage.removeItem('session.tokens');
            window.localStorage.setItem('tkf_saf','1');
            window.location.reload();
          }
          else {
            // window.localStorage.removeItem('session.tokens');
            window.localStorage.setItem('tkf_saf', '1');
            store.commit('setUserDataError', true);
          }
        }
        else {
          // window.localStorage.removeItem('session.tokens');
          window.localStorage.setItem('tkf_saf', '1');
          store.commit('setUserDataError', true);
        }
      });

    } catch (e) {
      // window.localStorage.removeItem('session.tokens');
      window.localStorage.setItem('tkf_saf', '1');
      store.commit('setUserDataError', true);
    }
  }
  else {
    const sessionStatus = getCookie('SessionStatus');

    if (sessionStatus === 'Status=Subscriber') {
      store.commit('setAuthLoading');

      apiInstance.getProfile(opts, getProfileCallback);
    } else {
      if (alreadyFetchedKey) {
        global.localStorage.removeItem('session.tokens');
        global.localStorage.removeItem('tkf_saf');
      }

      store.commit('setUserDataError', true);
    }
  }
};


// All user History of watching
const getWatchedHistoryUserData = () => {
  // store.commit('setAuthLoading');

  const getWatchedHistoryUserDataCallback = (error, data, response) => {
    if (error) {
      // console.log('Error: getVisualizationUserDataCallback');
    } else {
      // Get watched History User Data Success
      store.commit('setWatchingHistoryData', response.body);
    }
  };

  const apiInstance = new BritboxAccountApi.ProfileApi();
  apiInstance.getWatched(getWatchedHistoryUserDataCallback);
};

const getVideoIdAndClassification = fullData =>
  new Promise((resolve, reject) => {
    if (fullData.type === 'episode' || fullData.type === 'movie') {
      // Fix => Episode classification
      // a) HERO => fullData.classification.name
      // b) HERO => fullData.classification

      const videoClassification = Object.prototype.hasOwnProperty.call(
        fullData.classification,
        'name'
      )
        ? fullData.classification.name
        : fullData.classification;

      // Episode
      resolve({
        classification: videoClassification,
        videoId: fullData.id,
        type: fullData.type,
        suggestionType: fullData.type
      });
    } else {
      // SHOW or SEASON (need call "getNextPlaybackItem"  to know the Episode video ID related to the show or season)

      let currentShowId = '';
      const { id, showId } = fullData;
      if (fullData.type === 'show') {
        currentShowId = id;
      } else if (fullData.type === 'season') {
        currentShowId = showId;
      }

      const callback = function (error, data, response) {
        if (error) {
          reject(data);
        } else {
          let currentClassification = '';
          let currentVideoId = '';
          let currentType = '';

          if (response.body.externalResponse.suggestionType !== 'None') {
            if (response.body.externalResponse.next.type === 'episode') {
              const { classification } = response.body.externalResponse.next;
              if (typeof classification !== 'undefined') {
                currentClassification = Object.prototype.hasOwnProperty.call(
                  response.body.externalResponse.next.classification,
                  'name'
                )
                  ? response.body.externalResponse.next.classification.name
                  : response.body.externalResponse.next.classification;
              } else {
                currentClassification = '';
              }

              // currentClassification = response.body.externalResponse.next.classification.name;
              currentVideoId = response.body.externalResponse.next.id;
            }

            currentType = response.body.externalResponse.next.type;
          }

          resolve({
            classification: currentClassification,
            videoId: currentVideoId,
            path: fullData.path,
            type: currentType,
            suggestionType: response.body.externalResponse.suggestionType
          });
        }
      };
      const apiInstance = new BritboxAccountApi.ProfileApi();
      const opts = {
        device: 'web_browser',
        sub: 'Subscriber',
        segments: [global.Country]
      };

      apiInstance.getNextPlaybackItem(currentShowId, opts, callback);
    }
  });

const checkParentalControl = classification =>
  new Promise((resolve, reject) => {
    const opts = {
      classificationName: classification, // string
      segment: global.Country // string
    };

    const callback = function (error, data, response) {
      if (error) {
        reject(data);
      } else {
        resolve(response.body);
      }
    };

    const apiInstance = new BritboxAccountApi.ProfileApi();
    apiInstance.checkParentalControl(opts, callback);
  });

export { getData, getWatchedHistoryUserData, getVideoIdAndClassification, checkParentalControl };

export const Test = 1;
